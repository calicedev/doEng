import { useRef } from "react"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "../hooks/useWidthHwight"

function HomePage() {
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)
  return (
    <>
      <div
        ref={canvasDivRef}
        className={`w-full h-full blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div>
      <div className={``}>
        <div>홈인데요</div>
      </div>
    </>
  )
}

export default HomePage
