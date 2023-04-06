import Find from "components/SignComponents/Find"
import Login from "components/SignComponents/Login"
import Signup from "components/SignComponents/Signup"
import { useEffect, useRef } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "../hooks/useWidthHwight"

function SignPage() {
  // const navigate = useNavigate()
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)
  // useEffect(
  //   function () {
  //     if (type !== "login" && type !== "signup" && type !== "find") {
  //       navigate("/member/login")
  //     }
  //   },
  //   [type, navigate],
  // )
  return (
    <>
      <div
        className={`w-full lg:h-full h-auto blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div>
      <div ref={canvasDivRef} className={`page-container`}>
        <div
          className={`box-border lg:h-full h-full w-full rounded-[25px] flex items-center justify-center flex-row`}
        >
          {<Outlet /> || <div>ㅎㅇ</div>}
          {/* {type === "login" ? (
            <Login />
          ) : type === "signup" ? (
            <Signup />
          ) : type === "find" ? (
            <Find />
          ) : null} */}
        </div>
      </div>
    </>
  )
}

export default SignPage
