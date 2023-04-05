import uvicorn
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.inception_v3 import InceptionV3

import tensorflow as tf
from keras.models import load_model
from tensorflow.keras.utils import img_to_array

import io
import PIL
import cv2
import random
import base64
import numpy as np

from app.classes.doodle import ref as doodle_ref
from app.classes.inceptionV3 import ref as inceptionV3_ref

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ObjectImage(BaseModel):
    image: str = None
    answer: str


class ResultDto(BaseModel):
    image: str = None
    result: bool


doodle_model = tf.keras.models.load_model('./app/model/MobileNet.h5')
model = tf.keras.models.load_model('./app/model/emotion2.h5')
inceptionV3_model = tf.keras.applications.InceptionV3(
        include_top=True,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
        classes=1000,
        classifier_activation="softmax",
    )


@app.post('/analyze/face')
def predict(imgDto: ObjectImage):
    class_labels=['angry','disgust', 'fear', 'happy','neutral','sad','surprise']

    if imgDto.image == [] or imgDto.image == "" or imgDto.image is None : return {"result": "실패"}

    # image_data = imgDto.image.encode('utf-8')
    image_data_slice = imgDto.image.split(',')[1]
    image_data = base64.b64decode(image_data_slice)
    img_np = np.frombuffer(image_data, dtype=np.uint8)

    img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    face_cascade = cv2.CascadeClassifier('./app/model/haarcascade_frontalface_default.xml')

    faces = face_cascade.detectMultiScale(img ,scaleFactor=1.1,minNeighbors=5,minSize=(30,30),flags=cv2.CASCADE_SCALE_IMAGE)

    if len(faces) == 0 or len(faces) > 1:
        return {"result" : False}

    output = img[faces[0][1]:faces[0][1] + faces[0][3], faces[0][0]: faces[0][0] + faces[0][2]]

    output = cv2.resize(output, (48, 48))
    output = output.astype("float")/255.0
    output = img_to_array(output)
    output = np.expand_dims(output, axis=0)

    # 예측 수행
    predictions = model.predict(output)
    idx = class_labels.index(imgDto.answer.lower())

    result = np.argmax(predictions[0])
    
    return_img = None
    return_result = predictions[0].tolist()[idx] > 0.5
    if return_result:
        return_img = image_data_slice

    print(class_labels[result])
    answer_dto = ResultDto(image=return_img, result=return_result)
    # 결과 반환
    return answer_dto


@app.post('/analyze/object')
async def analyze_object(imageDto: ObjectImage):
    # 데이터 URL에서 Base64 인코딩된 이미지 데이터를 추출합니다.
    image_b64 = imageDto.image.split(",")[1]
    # Base64 디코딩을 수행합니다.
    image_data = base64.b64decode(image_b64)
    # 이미지 데이터를 PIL.Image 객체로 변환합니다.
    image_load = PIL.Image.open(io.BytesIO(image_data))
    # 이미지를 NumPy 배열로 변환합니다.
    image = np.array(image_load)

    # 이미지 천저리
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, [299, 299])
    image = tf.expand_dims(image, 0)

    # 모델 구동
    prediction = inceptionV3_model.predict(image)[0]

    # 결과 후처리
    idx = prediction.argmax()
    result = inceptionV3_ref[idx]
    print(result)
    # 반환
    answer_dto = ResultDto(image=image_b64, result=(result == imageDto.answer))
    # 반환
    return answer_dto


@app.post('/analyze/doodle')
async def analyze_object(imageDto: ObjectImage):

    # 데이터 URL에서 Base64 인코딩된 이미지 데이터를 추출합니다.
    image_b64 = imageDto.image.split(",")[1]
    # Base64 디코딩을 수행합니다.
    image_data = base64.b64decode(image_b64)
    # 이미지 데이터를 PIL.Image 객체로 변환합니다.
    image_load = PIL.Image.open(io.BytesIO(image_data))
    # 이미지를 NumPy 배열로 변환합니다.
    image = np.array(image_load)

    # 이미지 천저리
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, [128, 128])

    image = tf.expand_dims(image, 0)

    # 모델 구동
    prediction = doodle_model.predict(image)

    # print(prediction)

    def softmax(a):
        c = np.max(a)
        exp_a = np.exp(a - c)
        sum_exp_a = np.sum(exp_a)
        y = exp_a / sum_exp_a
        return y

    post_prediction = softmax(prediction)
    print(post_prediction)
    # 결과 후처리
    idx = post_prediction.argmax()
    result = doodle_ref[idx]

    print(idx, result)

    answer_dto = ResultDto(image=image_b64, result=(result == imageDto.answer))
    # 반환
    return answer_dto