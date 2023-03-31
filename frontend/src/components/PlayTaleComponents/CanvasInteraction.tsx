import { useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import { useRef, useEffect, useCallback, useState } from "react"
import axios from "utils/axios"
import { FaEraser } from "react-icons/fa"
import { io } from "socket.io-client"

const CanvasInteraction: React.FC = () => {
  // canvas
  const cavasContainerRef = useRef<HTMLDivElement>(null)
  const canvasBoardRef = useRef<HTMLCanvasElement>(null)
  const resetRef = useRef<HTMLDivElement>(null)
  const [canvasResult, setCanvasResult] = useState("")

  // const canvas = canvasBoardRef.current
  // const context = canvas?.getContext("2d")

  // canvas 캡쳐해서 보내기
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    const canvas = canvasBoardRef.current

    intervalId = setInterval(() => {
      if (canvas) {
        const imageUrl = canvas.toDataURL("image/jpeg", 1.0)
        const data = {
          image: imageUrl,
        }
        const config = {
          baseURL: "http://70.12.247.228:8080",
        }
        axios
          .post("/doodle?answer=dfsdg&sceneId=1&memberId=1", data, config)
          .then((res) => {
            console.log("Drawing uploaded successfully.", res)
            setCanvasResult(res.data.result)
          })
          .catch((err) => {
            console.log("An error occurred: ", err)
          })
      }
    }, 5000)

    // setInterval 삭제
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasBoardRef.current
    const context = canvas?.getContext("2d")

    // makeCanvas 함수내에서 context 할당 후, 외부 함수들에서 사용
    let painting = false // 그림을 현재 그리고 있는지 여부
    const pickedColor = "#000000" // 선 색깔
    const lineWidth = 3 // 선 두께

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
    <div style={{ display: "flex" }}>
      <div
        ref={cavasContainerRef}
        style={{ position: "relative", width: "600px", height: "400px" }}
      >
        <canvas
          ref={canvasBoardRef}
          style={{ border: "1px solid", width: "100%", height: "100%" }}
        ></canvas>
        <div
          ref={resetRef}
          style={{ position: "absolute", bottom: 0, right: 0 }}
        >
          <FaEraser />
        </div>
      </div>
      <div>{canvasResult}</div>
    </div>
  )
}

export default CanvasInteraction
