import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "utils/axios"
import { io } from "socket.io-client"
import { AxiosRequestConfig } from "axios"

const VideoInteraction: React.FC = () => {
  const [isVideo, setIsVideo] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [videoResult, setVideoResult] = useState<string>("")

  // useEffect(() => {
  //   const config = {
  //     mehtod: "get",
  //     url: "http://70.12.247.228:8080/test",
  //     proxy: {
  //       protocol: "http",
  //       host: "70.12.247.228",
  //       port: 8080,
  //     },
  //   }
  //   axios
  //     .request(config)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  // 비디오 재생
  useEffect(() => {
    let a: any
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        a = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsPlaying(true)
          console.log("실행")
        }
      })
      .catch((err) => {
        console.error("Could not access camera", err)
      })

    return function () {
      const tracks: any[] = a.getVideoTracks()
      console.log(tracks)
      if (tracks) {
        tracks.forEach((track) => {
          track.stop()
          a.removeTrack(track)
        })
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
          const config: AxiosRequestConfig = {}
          axios({
            baseURL: "http://70.12.247.228:8080",
            proxy: {
              protocol: "http",
              host: "70.12.247.228",
              port: 8080,
            },
            method: `post`,
            url: `/face?answer=dfsdg&sceneId=1&memberId=1`,
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

  return (
    <div className={`flex flex-column items-center`}>
      <button onClick={handleVideo}>{isPlaying ? "일시정지" : "플레이"}</button>
      <video ref={videoRef} />
      <div>{videoResult}</div>
    </div>
  )
}

export default VideoInteraction
