import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

import VideoInteraction from "./VideoInteraction"
import CanvasInteraction from "./CanvasInteraction"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

const InteractionComp: React.FC = () => {
  const [isVideo, setIsVideo] = useState(true)

  const handleType = () => {
    if (isVideo) {
      setIsVideo(false)
      return
    }
    setIsVideo(true)
  }

  return (
    <div className="flex flex-col">
      <button onClick={handleType}>{isVideo ? "카메라" : "캔버스"}</button>
      {isVideo ? <VideoInteraction /> : <CanvasInteraction />}
    </div>
  )
}

export default InteractionComp
