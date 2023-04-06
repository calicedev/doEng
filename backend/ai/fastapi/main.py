from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import matplotlib.pyplot as plt

import tensorflow as tf
from tensorflow.keras.applications.inception_v3 import InceptionV3
import io
import cv2
import PIL
import base64
import numpy as np

from classes.inceptionV3 import ref as inceptionV3_ref
from classes.doodle import ref as doodle_ref

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Image(BaseModel):
    image_url: str

inceptionV3_model = tf.keras.applications.InceptionV3(
        include_top=True,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
        classes=1000,
        classifier_activation="softmax",
    )

doodle_model = tf.keras.models.load_model('./models/inceptionV3_150.h5')

@app.get("/")
async def root():
    return {"message": "Hello I'm doeng's fastapi"}

@app.post('/analyze/object/inceptionV3')
async def analyze_object(image: Image):

    # Base64 인코딩 이미지 -> numpy
    image_b64 = image.image_url.split(",")[1]       # 데이터 URL에서 Base64 인코딩된 이미지 데이터를 추출
    image_data = base64.b64decode(image_b64)        # Base64 디코딩
    image_load = PIL.Image.open(io.BytesIO(image_data))      # 이미지 데이터를 PIL.Image 객체로 변환
    image = np.array(image_load)                    # 이미지를 NumPy 배열로 변환

    # 이미지 천저리 
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, [299, 299])
    image = tf.expand_dims(image, 0)
    
    # 모델 구동
    prediction = inceptionV3_model.predict(image)[0]

    # 결과 후처리
    idx = prediction.argmax()
    result = inceptionV3_ref[idx]

    # 반환
    return {"result": result}

@app.post('/analyze/object/yolo')
async def analyze_object(image: Image):
    
    # Base64 인코딩 이미지 -> BLOB
    image_b64 = image.image_url.split(",")[1]       # 데이터 URL에서 Base64 인코딩된 이미지 데이터를 추출
    image_data = base64.b64decode(image_b64)        # Base64 디코딩
    image_load= PIL.Image.open(io.BytesIO(image_data))      # 이미지 데이터를 PIL.Image 객체로 변환
    image = np.array(image_load)                    # 이미지를 NumPy 배열로 변환
    image = cv2.resize(image, None, fx=0.4, fy=0.4) # 이미지 크기를 재설정(Yolo)
    blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), (0, 0, 0), True, crop=False) # 이미지를 blob으로 변환

    # Yolo 모델 로드
    net = cv2.dnn.readNet("classes/yolov3.weights", "classes/yolov3.cfg")       # https://pjreddie.com/darknet/yolo/

    # class 배열 생성
    classes = [] 
    with open("classes/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()] 

    layer_names = net.getLayerNames() # 네트워크의 모든 레이어 이름을 가져와서 layer_names에 넣는다.
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()] 

    # 물체 감지
    net.setInput(blob)                  # input 
    outs = net.forward(output_layers)   # output

    class_ids = []  # 클래스 아이디
    confidences = [] # 신뢰도(0 ~ 1)
    for out in outs:
        for detection in out:
            scores = detection[5:]  # 신뢰도 0.5 이상만
            class_id = np.argmax(scores) # scores 중에서 최대값을 색인하여 class_id에 넣는다.
            confidence = scores[class_id] # scores 중에서 class_id에 해당하는 값을 confidence에 넣는다.
            if confidence > 0.5:
                confidences.append(float(confidence))
                class_ids.append(class_id)

    result = []
    for i in range(len(class_ids)): 
        label = str(classes[class_ids[i]]) # 클래스 아이디 지정해둔 것을 label변수에 저장
        if label == 'person':
            continue
        result.append(label)
    # 반환
    return {"result": result}

@app.post('/analyze/doodle')
async def analyze_object(image: Image):

    # Base64 인코딩 이미지 -> numpy
    image_b64 = image.image_url.split(",")[1]       # 데이터 URL에서 Base64 인코딩된 이미지 데이터를 추출
    image_data = base64.b64decode(image_b64)        # Base64 디코딩
    image_load = PIL.Image.open(io.BytesIO(image_data))      # 이미지 데이터를 PIL.Image 객체로 변환
    image = np.array(image_load)                    # 이미지를 NumPy 배열로 변환

    # 이미지 천저리 
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, [299, 299])
    image = tf.expand_dims(image, 0)
    
    
    # 모델 구동
    prediction = doodle_model.predict(image)

    def softmax(a):
        c = np.max(a)
        exp_a = np.exp(a-c)
        sum_exp_a = np.sum(exp_a)
        y = exp_a / sum_exp_a
        return y

    # 결과 후처리
    post_prediction = softmax(prediction)
    idx = post_prediction.argmax()
    result = doodle_ref[idx]

    # 반환
    return {"result": result}

# uvicorn main:app --reload