import { useRef, useEffect } from "react"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "../hooks/useWidthHwight"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useNavigate } from "react-router-dom"
import LoadingComp from "components/UI/LoadingComp"
import * as Q from "../hooks/queries/queries"

function HomePage() {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)
  // const a = Q.useUserData()
  // const b = Q.useProgressTaleList()
  // console.log(b.data)
  // const c = Q.useProgressTaleDetail(1)
  // console.log(c.data)
  // const d = Q.useStoreTaleList()
  // const e = Q.useStoreTaleDetail(2)
  // const f = Q.useReviewList(1)
  // const g = Q.usePlayTaleList()
  // const h = Q.usePlayTaleDetail(2) // 추가 확인 필요
  // const i = Q.useWordList()
  // const j = Q.useSceneList(1)
  // const k = Q.useSceneDetail(1, 1)
  // const l = Q.useWordTestResult(1)
  // const m = Q.useReviewList(1) // 미확인
  const goLogin = function () {
    navigate("/member/login")
  }
  const goPlaytale = function () {
    navigate("/playtale")
  }
  const goMyPage = function () {
    navigate("/mypage")
  }

  return (
    <div className="h-full w-full box-border">
      <LoadingComp />
      {/* <div
        ref={canvasDivRef}
        className={`w-full h-full blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div> */}
      <div
        className={`h-full w-full flex flex-col items-center justify-center gap-4`}
      >
        <div>홈인데요 홈인데요</div>
        <div
          onClick={goLogin}
          className={`cursor-pointer rounded-[8px] bg-lime-300 px-3 py-3`}
        >
          로그인 하세요
        </div>
        <div
          onClick={goPlaytale}
          className={`cursor-pointer rounded-[8px] bg-lime-300 px-3 py-3`}
        >
          플레이 목록 보세요
        </div>
        <div
          onClick={goMyPage}
          className={`cursor-pointer rounded-[8px] bg-lime-300 px-3 py-3`}
        >
          마이 페이지 보세요
        </div>
      </div>
    </div>
  )
}

export default HomePage
