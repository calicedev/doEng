import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

import VideoInteraction from "./VideoInteraction"
import CanvasInteraction from "./CanvasInteraction"
import { useSceneDetail } from "hooks/queries/queries"

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
  const { data: sceneDetail } = useSceneDetail(taleId, sceneOrder)

  const handleType = () => {
    if (isVideo) {
      setIsVideo(false)
      return
    }
    setIsVideo(true)
  }

  return (
    <>
      <div className="fixed top-0 z-[50] mt-[3%] bg-title-pan">
        {sceneDetail?.scriptList[0].content}
      </div>
      <div className="h-full w-full bg-scene-back content-center bg-no-repeat bg-cover relative flex flex-row">
        <div className="basis[50%] w-[50%] object-contain h-full flex items-center justify-center">
          <img src={sceneDetail?.image} className="" />
        </div>
        <div className="basis-[50%] w-[50%] flex flex-col h-full items-center justify-center">
          <button onClick={handleType}>{isVideo ? "카메라" : "캔버스"}</button>
          {isVideo ? (
            <VideoInteraction changeScene={changeScene} />
          ) : (
            <CanvasInteraction changeScene={changeScene} />
          )}
        </div>
      </div>
      <div
        onClick={changeScene}
        className="absolute z-[49] left-0 bottom-[50%] p-5"
      >
        {sceneDetail?.scriptList[0].content}
      </div>
    </>
  )
}

export default InteractionComp
