import { useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useAnimation } from "../hooks/useAnimation"
import { useWidthHeight } from "../hooks/useWidthHwight"

function SignPage() {
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)
  const [testFlag, setTestFlag] = useState<boolean>(true)
  const { isRender: isLoginRender, animationComp: Animate } = useAnimation(
    testFlag,
    <Outlet />
  )
  const toggleLoginComp: React.MouseEventHandler = function (e) {
    e.preventDefault()
    setTestFlag((val) => !val)
  }
  return (
    <>
      <div
        ref={canvasDivRef}
        className={`w-full h-full blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div>
      <div className={``}>
        <div>싸인인데요</div>
        <button onClick={toggleLoginComp}>토글 로그인</button>
        {isLoginRender && <Animate />}
      </div>
    </>
  )
}

export default SignPage
