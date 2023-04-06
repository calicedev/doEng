import LinearTracking from "components/CanvasComponents/MouseTracking/LinearTracking"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import CommonLoading from "components/UI/CommonLoading"
import { useWidthHeight } from "hooks/useWidthHwight"
import { PropsWithChildren, useRef } from "react"

interface Props {
  loadingText?: string
}

const LoadingPage = function ({
  loadingText = "로딩중...",
}: PropsWithChildren<Props>) {
  let loadingArr = []
  for (let v of loadingText) {
    loadingArr.push(v)
  }
  return (
    <CommonLoading>
      <div className="text-[66px] font-hopang-black w-auto h-auto flex items-center justify-center">
        {loadingArr.map((val, idx) => (
          <AnimationBox
            appearClassName={textOneByOne[idx * 2]}
            key={`loading-text-${idx}`}
          >
            {val}
          </AnimationBox>
        ))}
      </div>
    </CommonLoading>
  )
}

export default LoadingPage
