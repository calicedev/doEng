import { useState, useEffect, useRef } from "react"
import { useWidthHeight } from "hooks/useWidthHwight"

const NotFoundPage = function () {
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasHeight, setCanvasHeight] = useState<number>(0)
  const pageRef = useRef<HTMLDivElement>(null)
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth],
  )
  useWidthHeight(pageRef)
  return (
    <>
      <div className={`canvas-under-bg-container`}>
        <div>여기 캔버스 들어갈거고</div>
      </div>
      <div ref={pageRef}>
        <div>여기는 뒤로</div>
        <div>여기는 홈으로</div>
      </div>
    </>
  )
}

export default NotFoundPage
