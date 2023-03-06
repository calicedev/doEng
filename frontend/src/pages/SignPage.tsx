import { useRef } from "react"
import { Outlet } from "react-router-dom"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "../hooks/useWidthHwight"

function SignPage() {
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)

  return (
    <>
      <div className={`w-full h-full blur-sm canvas-under-bg-container`}>
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div>
      <div ref={canvasDivRef} className={`page-container`}>
        <div
          className={`sign-outlet-container h-full w-full rounded-[25px] flex items-center justify-center flex-row`}
        >
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SignPage
