import { useEffect, useState } from "react"
import Wave from "../components/CanvasComponents/Wave/Wave"

function HomePage() {
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasHeight, setCanvasHeight] = useState<number>(0)
  useEffect(
    function () {
      setCanvasHeight(window.innerHeight)
      setCanvasWidth(window.innerWidth)
    },
    [window.innerHeight, window.innerWidth]
  )
  return (
    <>
      <div className="h-full w-full fixed">
        <Wave canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
      </div>
      <div>홈입니다.</div>
    </>
  )
}

export default HomePage
