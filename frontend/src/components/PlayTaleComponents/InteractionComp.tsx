import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

import VideoInteraction from "./VideoInteraction"
import CanvasInteraction from "./CanvasInteraction"
import { useSceneDetail } from "hooks/queries/queries"
import { useWidthHeight } from "hooks/useWidthHwight"
import AnimationBox from "components/UI/AnimationBox"
import Modal from "components/UI/Modal"
import WordModal from "./WordModal"
import CorrectAudio from "../../assets/audios/correct_sound.m4a"
import FailAudio from "../../assets/audios/fail_sound.m4a"

// import TitlePan from "../../assets/images/TitlePan.png"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

interface Props {
  taleId: number
  sceneOrder: number
  changeScene: (type: `next` | `before`) => void
  isKor?: boolean
}

const InteractionComp: React.FC<Props> = ({
  taleId,
  sceneOrder,
  changeScene,
  isKor = false,
}) => {
  const { data: sceneDetail } = useSceneDetail(taleId, sceneOrder) // 씬의 정보를 fetch
  const [seconds, setSeconds] = useState(180) // 타이머의 남은 seconds
  const [isVideo, setIsVideo] = useState<boolean>(true) // interaction 타입. 초기에는 항상 카메라
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true) // 카메라 로딩상태
  const [isCorrect, setIsCorrect] = useState<boolean>(false) // 단어 맞춤 여부
  const [isModal, setIsModal] = useState<boolean>(false) // 모달창 여부
  const divRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [correctAudio] = useState(new Audio(CorrectAudio))
  const [failAudio] = useState(new Audio(FailAudio))
  const { height } = useWidthHeight(divRef)

  correctAudio.volume = 0.1
  failAudio.volume = 0.1
  // loadingCam의 상태를 토글하는 함수
  const [setLoadingOn, setLoadingOff] = [
    function () {
      setIsVideoLoading(true)
    },
    function () {
      setIsVideoLoading(false)
    },
  ]

  // interaction 상태를 토글하는 함수 (카메라 <-> 캔버스)
  const [changeToCanvas, changeToVideo] = [
    function () {
      setIsVideo(false)
    },
    function () {
      setIsVideo(true)
    },
  ]

  // 카메라 로딩이 끝나면 타이머 시작
  useEffect(() => {
    if (!isVideoLoading) {
      if (seconds > 0) {
        const intervalId = setInterval(() => {
          setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(intervalId)
      }
    }

    if (seconds <= 0) {
      failAudio.play() // 효과음 재생
      setIsModal(true) // 단어 맞춤 카드 띄우기
      // 타이머 시작
      setTimeout(() => {
        setIsModal(false) // 모달 창 닫기
        changeScene("next") // 화면 넘기기
      }, 3000)
    }
  }, [seconds, isVideoLoading])

  // 단어를 맞췄을 때 동작하는 함수
  useEffect(() => {
    if (isCorrect) {
      correctAudio.play() // 효과음 재생
      setIsModal(true) // 단어 맞춤 카드 띄우기
      // 타이머 시작
      setTimeout(() => {
        setIsModal(false) // 모달 창 닫기
        changeScene("next") // 화면 넘기기
      }, 3000)
    }
  }, [isCorrect])

  return (
    <>
      {sceneDetail && (
        <>
          {isModal && (
            <Modal closeModal={() => setIsModal(false)} backgroundOpacity="20">
              <WordModal word={sceneDetail.word} />
            </Modal>
          )}
          <div className="flex flex-col h-full w-full bg-scene-back content-center bg-no-repeat bg-cover items-center justify-center">
            <div
              ref={divRef}
              className="h-[23%] w-full top-0 z-[50] bg-title-pan flex items-center justify-center relative bottom-0 bg-contain bg-no-repeat bg-center mt-[3%]"
            >
              <div
                className="bg-opacity-80 bg-white rounded-[13px] h-[70%] w-[40%] mb-[1%] flex items-center justify-center"
                style={{ width: `${height * 2.2}px` }}
              >
                <AnimationBox boxClasses="text-3xl">
                  {sceneDetail?.scriptList[0].content}
                </AnimationBox>
              </div>
            </div>
            <div className="h-[74%] w-[90%] relative flex flex-row items-center justify-center pb-[5%]">
              <div className="basis[50%] w-[50%] object-contain h-full flex items-center justify-center">
                <img
                  src={sceneDetail?.image}
                  className="object-contain bg-img-gradient"
                />
              </div>
              <div className="basis-[50%] w-[50%] flex flex-col h-full items-center justify-center">
                <div>
                  {Math.floor(seconds / 60)}:{seconds % 60}
                </div>
                {isVideo ? (
                  <VideoInteraction
                    word={sceneDetail.word.engWord}
                    sceneId={sceneDetail.id}
                    interactiveType={sceneDetail.interactiveType}
                    isVideoLoading={isVideoLoading}
                    setLoadingOff={setLoadingOff}
                    setLoadingOn={setLoadingOn}
                    changeToCanvas={changeToCanvas}
                    isCorrect={isCorrect}
                    setIsCorrect={setIsCorrect}
                  />
                ) : (
                  <CanvasInteraction
                    word={sceneDetail.word.engWord}
                    sceneId={sceneDetail.id}
                    changeToVideo={changeToVideo}
                    isCorrect={isCorrect}
                    setIsCorrect={setIsCorrect}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default InteractionComp
