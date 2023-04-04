import { useNavigate, useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"
import { AxiosRequestConfig } from "axios"
import { SpinnerDots } from "components/UI/Spinner"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

interface Props {
  changeScene: (type: `next` | `before`) => void
  setLoadingON: () => void
  setLoadingOFF: () => void
  isVideoLoading: boolean
}

const VideoInteraction: React.FC<Props> = ({
  changeScene,
  setLoadingOFF,
  setLoadingON,
  isVideoLoading,
}) => {
  const [isVideo, setIsVideo] = useState(true)
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [videoResult, setVideoResult] = useState<string>("")

  // 비디오 재생
  useEffect(() => {
    let a: any
    setLoadingON()
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        a = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsPlaying(true)
        }
        return stream
      })
      .then(() => {
        setLoadingOFF()
      })
      .catch((err) => {
        console.error("Could not access camera", err)
      })

    return function () {
      try {
        const tracks: any[] = a.getVideoTracks()
        if (tracks) {
          tracks.forEach((track) => {
            track.stop()
            a.removeTrack(track)
          })
        }
      } catch {
        // navigate(`/error`)
      }
    }
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
          apiRequest({
            method: `post`,
            baseURL: "http://70.12.247.228:8080",
            url: `/game/face?answer=dfsdg&sceneId=1&memberId=1`,
            data: {
              image: imageUrl,
            },
            params: {
              answer: "happy",
              sceneId: "1",
              memberId: "1",
            },
          })
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

  const [hideVideo, setHideVideo] = useState<string>("")
  useEffect(
    function () {
      if (isVideoLoading) {
        setHideVideo(() => "hidden")
      } else {
        setHideVideo(() => "")
      }
    },
    [isVideoLoading],
  )

  return (
    <div className={`flex flex-col items-center justify-center`}>
      <button onClick={handleVideo}>{isPlaying ? "일시정지" : "재진행"}</button>
      {isVideoLoading ? <SpinnerDots /> : null}
      <video
        ref={videoRef}
        className={`rounded-[22px] shadow-2xl ${hideVideo}`}
      />
      <div>{videoResult}</div>
    </div>
  )
}

export default VideoInteraction
