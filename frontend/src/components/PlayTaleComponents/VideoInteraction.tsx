import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "utils/axios"
import { io } from "socket.io-client"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

const VideoInteraction: React.FC = () => {
  const [isVideo, setIsVideo] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
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
    let intervalId: NodeJS.Timeout | null = null

    if (isPlaying) {
      intervalId = setInterval(() => {
        const video = videoRef.current
        if (video) {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageUrl = canvas.toDataURL("image/jpeg", 1.0)
          axios
            .post(serverUrl, { image: imageUrl })
            .then((res) => {
              console.log("Image uploaded successfully.", res)
              setVideoResult(res.data.result)
            })
            .catch((err) => {
              console.log("An error occurred: ", err)
            })
        }
      }, 5000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying])

  // 비디오 일시정지
  const handleVideo = () => {
    if (isPlaying) {
      videoRef.current?.pause()
      setIsPlaying(false)
      return
    }
    videoRef.current?.play()
    setIsPlaying(true)
  }

  const handleType = () => {
    if (isVideo) {
      videoRef.current?.pause()
      setIsPlaying(false)
      setIsVideo(false)
      return
    }
    setIsVideo(true)
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div className={`flex flex-column items-center`}>
      <button onClick={handleVideo}>{isPlaying ? "일시정지" : "플레이"}</button>
      <video ref={videoRef} />
      <div>{videoResult}</div>
    </div>
  )
}

export default VideoInteraction
