import { useParams } from "react-router-dom"
import apiRequest, { gameRequest } from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "axios"
import { FaEraser } from "react-icons/fa"
import { io } from "socket.io-client"

interface Props {
  word: string // 영단어
  sceneId: number // 씬Id
  changeToVideo: () => void // 비디오 interaction으로 바꾸는 함수
  isCorrect: boolean // 정답 여부
  setIsCorrect: (type: boolean) => void // 정답 여부를 바꾸는 함수
}

const CanvasInteraction: React.FC<Props> = ({
  word,
  sceneId,
  changeToVideo,
  isCorrect,
  setIsCorrect,
}) => {
  // 그림판 관련 useRef 형성
  const cavasContainerRef = useRef<HTMLDivElement>(null)
  const canvasBoardRef = useRef<HTMLCanvasElement>(null)
  const resetRef = useRef<HTMLDivElement>(null)
  const [canvasResult, setCanvasResult] = useState("")

  // canvas 캡쳐해서 보내기
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    const canvas = canvasBoardRef.current
    if (!isCorrect) {
      intervalId = setInterval(() => {
        if (canvas) {
          const imageUrl = canvas.toDataURL("image/jpeg", 1.0)
          gameRequest({
            method: `post`,
            url: `/game/doodle`,
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
            .catch((err) => {})
        }
      }, 5000)
    }
    // interval cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isCorrect])

  useEffect(() => {
    // makeCanvas 함수내에서 context 할당 후 외부 함수들에서 사용
    const canvas = canvasBoardRef.current
    const context = canvas?.getContext("2d")

    let painting = false // 그림을 현재 그리고 있는지 여부
    const pickedColor = "#000000" // 선 색깔
    const lineWidth = 5 // 선 두께

    // 그림판 생성
    const makeCanvas = () => {
      if (!canvas) return
      if (!context) return
      context.lineCap = "round"

      // 화면 크기에 맞춰서 생성
      canvas.width = cavasContainerRef?.current?.clientWidth!
      canvas.height = cavasContainerRef?.current?.clientHeight!

      context.fillStyle = "white"
      context.fillRect(0, 0, canvas.width, canvas.height)

      // mouse event 관련 이벤트 리스너
      canvas.addEventListener("mousedown", readyPainting)
      canvas.addEventListener("mousemove", beginPainting)
      canvas.addEventListener("mouseup", stopPainting)
      canvas.addEventListener("mouseout", stopPainting)

      // touch event 관련 이벤트 리스너
      canvas.addEventListener("touchstart", readyPainting)
      canvas.addEventListener("touchmove", beginPainting)
      canvas.addEventListener("touchend", stopPainting)

      // 지우개 기능
      if (resetRef.current) {
        resetRef.current.onclick = () => {
          context.fillStyle = "white"
          context.fillRect(0, 0, canvas.width, canvas.height)
        }
      }
    }

    // 마우스 위치 잡아서 반환하는 함수
    function getMosuePositionOnCanvas(e: any) {
      if (e.touches) {
        return {
          x: e.touches[0].clientX - e.target.parentNode.offsetLeft,
          y: e.touches[0].clientY - e.target.parentNode.offsetHeight,
        }
      }
      return { x: e.offsetX, y: e.offsetY }
    }

    // mousedown, touchstart
    function readyPainting(e: MouseEvent | TouchEvent) {
      e.preventDefault()
      if (!canvas) return
      if (!context) return
      const mousePos = getMosuePositionOnCanvas(e)
      context.beginPath() // 색깔 변경시 기존 선 색상 유지
      context.moveTo(mousePos.x, mousePos.y)
      context.lineWidth = lineWidth
      context.strokeStyle = pickedColor
      painting = true
    }

    // mousemove, touchmove
    function beginPainting(e: MouseEvent | TouchEvent) {
      e.preventDefault()
      if (!canvas) return
      if (!context) return
      if (painting) {
        const mousePos = getMosuePositionOnCanvas(e)
        context.lineTo(mousePos.x, mousePos.y)
        context.stroke()
        const data = {
          x: mousePos.x,
          y: mousePos.y,
          lineWidth,
          color: pickedColor,
          painting: true,
        }
      }
    }

    // mouseup, mouseout, touchend
    function stopPainting(e: MouseEvent | TouchEvent) {
      e.preventDefault()
      if (!canvas) return
      if (!context) return
      if (painting) {
        context.stroke()
      }
      painting = false
    }

    makeCanvas()
  }, [])

  return (
    <div
      className={`flex flex-col gap-3 items-center justify-center w-full h-full`}
    >
      <div ref={cavasContainerRef} className="relative w-full h-full">
        <canvas
          ref={canvasBoardRef}
          className="w-full h-full rounded-[22px] shadow-2xl"
        ></canvas>
        <div
          ref={resetRef}
          className="absolute bottom-3 right-3 text-4xl cursor-pointer"
        >
          <FaEraser />
        </div>
      </div>
      <button
        onClick={changeToVideo}
        className="flex items-center justify-center px-3 py-1 font-hopang-black text-lime-700 text-xl border-[4px] rounded-full border-lime-500 bg-opacity-80 bg-gradient-to-tl from-lime-400 to-lime-200 shadow-xl duration-200 hover:scale-105 cursor-pointer"
      >
        카메라로 풀기
      </button>
    </div>
  )
}

export default CanvasInteraction
