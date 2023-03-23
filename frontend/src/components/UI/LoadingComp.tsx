import MouseTracking from "components/CanvasComponents/MouseTracking/MouseTracking"
import { useWidthHeight } from "hooks/useWidthHwight"
import { useRef } from "react"

const LoadingComp = function () {
  const divRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWidthHeight(divRef)
  return (
    <>
      <div ref={divRef} className="canvas-under-bg-container h-full w-full">
        <MouseTracking canvasWidth={width} canvasHeight={height} />
      </div>
    </>
  )
}

export default LoadingComp
