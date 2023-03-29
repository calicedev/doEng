import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

const serverUrl =
  "ws://70.12.247.228:8080/ws/face?answer=happy&taleid=1&sceneId=2&memberId=1"

const InteractionComp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
  const [videoResult, setVideoResult] = useState<string>("")

  // 비디오 재생
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsPlaying(true)
        }
      })
      .catch((err) => {
        console.error("Could not access camera", err)
      })
  }, [])

  useEffect(() => {
    console.log(webSocket)
    let intervalId: NodeJS.Timeout | null = null

    if (webSocket) {
      webSocket.addEventListener("open", () => {
        console.log("open")
        intervalId = setInterval(() => {
          // webSocket.send("abcd")
          const video = videoRef.current
          if (video) {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
            canvas.toBlob(
              (blob) => {
                webSocket.send(blob ? blob : "")
                console.log(blob)
              },
              "image/jpeg",
              0.7,
            )
          }
        }, 1000)
      })

      webSocket.addEventListener("close", () => {
        console.log("close")
        if (intervalId) {
          clearInterval(intervalId)
        }
      })
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [webSocket])

  // 비디오 일시정지
  const handleVideo = () => {
    if (isPlaying) {
      videoRef.current?.pause()
      setIsPlaying(false)

      webSocket?.close()
      setWebSocket(null)

      return
    }
    videoRef.current?.play()
    setIsPlaying(true)

    const ws = new WebSocket(serverUrl)
    setWebSocket(ws)
  }

  return (
    <div className={`flex flex-column items-center`}>
      <button onClick={handleVideo}>{isPlaying ? "일시정지" : "플레이"}</button>
      <video ref={videoRef} />
      <div>{videoResult}</div>
    </div>
  )
}

export default InteractionComp
