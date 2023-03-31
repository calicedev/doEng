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

// import TitlePan from "../../assets/images/TitlePan.png"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

interface Props {
  taleId: number
  sceneOrder: number
  changeScene: () => void
}

const InteractionComp: React.FC<Props> = ({
  taleId,
  sceneOrder,
  changeScene,
}) => {
  const [isVideo, setIsVideo] = useState(true)
  const [loadingCam, setLoadingCam] = useState<boolean>(true)
  const [setLoadingON, setLoadingOFF] = [
    function () {
      setLoadingCam(() => true)
    },
    function () {
      setLoadingCam(() => false)
    },
  ]
  const { data: sceneDetail } = useSceneDetail(taleId, sceneOrder)

  const handleType = () => {
    if (isVideo) {
      setIsVideo(false)
      return
    }
    setIsVideo(true)
  }
  const divRef = useRef<HTMLDivElement>(null)
  const { height } = useWidthHeight(divRef)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (loadingCam) {
      return
    }
    if (seconds >= 0) {
      const intervalId = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
      return () => clearInterval(intervalId)
    }
    if (seconds < 0) {
      changeScene()
    }
  }, [seconds, loadingCam])

  return (
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
          <button onClick={handleType}>{isVideo ? "카메라" : "캔버스"}</button>
          {isVideo ? (
            <VideoInteraction
              changeScene={changeScene}
              setLoadingOFF={setLoadingOFF}
              setLoadingON={setLoadingON}
              isVideoLoading={loadingCam}
            />
          ) : (
            <CanvasInteraction changeScene={changeScene} />
          )}
          <div>{seconds}</div>
        </div>
      </div>
      <div
        onClick={changeScene}
        className="absolute z-[49] left-0 bottom-[50%] p-5"
      >
        {sceneDetail?.scriptList[0].content}
      </div>
    </div>
  )
}

export default InteractionComp
