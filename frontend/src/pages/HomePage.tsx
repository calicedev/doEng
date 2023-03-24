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

  return (
    <div className="h-full w-full box-border">
      <LoadingComp />
      {/* <div
        ref={canvasDivRef}
        className={`w-full h-full blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div> */}
      <div className={`h-full w-full flex items-center justify-center`}>
        <div>홈인데요 홈인데요</div>
      </div>
    </div>
  )
}

export default HomePage
