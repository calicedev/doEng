import { useNavigate, useParams } from "react-router-dom"
import apiRequest, { gameRequest } from "utils/axios"
import { useRef, useEffect, useCallback, useMemo, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"
import { AxiosRequestConfig } from "axios"
import { SpinnerDots } from "components/UI/Spinner"

const serverUrl =
  "http://70.12.247.228:8080/face?answer=happy&taleid=1&sceneId=2&memberId=1"

interface Props {
  word: string // 영단어
  sceneId: number // 씬Id
  interactiveType: number // 1일 경우 표정, 2일 경우 객체
  isVideoLoading: boolean // 비디오 로딩여부
  setLoadingOn: () => void // 비디오 로딩상태를 on으로 바꾸는 함수
  setLoadingOff: () => void // 비디오 로딩상태를 off로 바꾸는 함수
  changeToCanvas: () => void // 캔버스 interaction으로 바꾸는 함수
  isCorrect: boolean // 정답 여부
  setIsCorrect: (type: boolean) => void // 정답 여부를 바꾸는 함수
}

const VideoInteraction: React.FC<Props> = ({
  word,
  sceneId,
  interactiveType,
  isVideoLoading,
  setLoadingOn,
  setLoadingOff,
  changeToCanvas,
  isCorrect,
  setIsCorrect,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [videoResult, setVideoResult] = useState<string>("")

  // 마운트 시, video 태그에 카메라 stream 재생
  useEffect(() => {
    let videostream: any // 카메라 스트림 저장할 변수
    setLoadingOn() // 카메라 로딩 상태 전환
    navigator.mediaDevices // 카메라 stream 가져오기
      .getUserMedia({ video: true })
      .then((stream) => {
        videostream = stream // 카메라 스트림 저장
        if (videoRef.current) {
          // video 태그에 카메라 스트림 연결 후 재생
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsPlaying(true)
          setLoadingOff() // 카메라 로딩 상태 완료
        }
      })
      .catch((err) => {
        console.error("Could not access camera", err)
      })
    // video 태그에서 카메라 스트림 제거
    return function () {
      try {
        const tracks: any[] = videostream.getVideoTracks()
        if (tracks) {
          tracks.forEach((track) => {
            track.stop()
            videostream.removeTrack(track)
          })
        }
      } catch {}
    }
  }, [])

  // 카메라 캡쳐해서 보내기
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isPlaying && !isCorrect) {
      intervalId = setInterval(() => {
        const video = videoRef.current
        if (video) {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageUrl = canvas.toDataURL("image/jpeg", 1.0)
          gameRequest({
            method: `post`,
            url: `/game/${interactiveType === 1 ? "face" : "object"}`,
            data: {
              image: imageUrl,
            },
            params: {
              answer: word,
              sceneId,
            },
          })
            .then((res) => {
              if (res.data === true) {
                setIsCorrect(true)
              }
            })
            .catch((err) => {
              console.log("An error occurred: ", err)
            })
        }
      }, 5000)
    }
    // interval cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, isCorrect])

  const hiddenClass = useMemo(() => {
    if (isVideoLoading) return "hidden"
    return ""
  }, [isVideoLoading])

  const togglePlaying = () => {
    if (isPlaying) {
      videoRef.current?.pause()
      setIsPlaying(false)
      return
    }
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div className={`flex flex-col gap-5 items-center justify-center`}>
      {isVideoLoading ? <SpinnerDots /> : null}
      <video
        ref={videoRef}
        className={`rounded-[22px] shadow-2xl ` + hiddenClass}
      />
      {interactiveType === 2 && (
        <button
          onClick={changeToCanvas}
          className="flex items-center justify-center px-3 py-1 font-hopang-black text-lime-700 text-xl border-[4px] rounded-full border-lime-500 bg-opacity-80 bg-gradient-to-tl from-lime-400 to-lime-200 shadow-xl duration-200 hover:scale-105 cursor-pointer"
        >
          그림으로 그리기
        </button>
      )}
      <div>{videoResult}</div>
    </div>
  )
}

export default VideoInteraction
