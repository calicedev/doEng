import AnimationBox from "components/UI/AnimationBox"
import { PlayTaleDetail, usePlayTaleDetail } from "hooks/queries/queries"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import DetailBackground from "../../assets/images/DetailBackground.png"
import DetailRightBackground from "../../assets/images/DetailRightBackground.png"
import DetailClose from "../../assets/images/DetailClose.png"
import { useAnimate } from "hooks/useAnimate"
import { useWidthHeight } from "hooks/useWidthHwight"

interface Props {
  taleId: number
  closeModal: () => void
}

const PlayTaleDetailCompo = function ({
  taleId,
  closeModal,
}: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const { data: PlayTaleDetailData } = usePlayTaleDetail(taleId)
  console.log(PlayTaleDetailData)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const restartHandler = function () {
    // navigate()
  }
  const continueHandler = function () {
    // navigate()
  }
  const wordTestHandler = function () {}
  const closeWithAnimation = function () {
    setIsOpen(() => false)
  }
  const { isRender, animationEndHandler, animationClasses } = useAnimate(
    isOpen,
    `animate-appear-from-bottom-super-fast`,
    `animate-disappear-to-bottom-super-fast`,
  )
  useEffect(
    function () {
      if (isRender) {
        return
      } else {
        closeModal()
      }
    },
    [isRender],
  )
  const bgRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWidthHeight(bgRef)
  const [customWidth, setCustomWidth] = useState<number>(height * 0.73)
  useEffect(
    function () {
      setCustomWidth(() => height * 0.73)
    },
    [height],
  )
  return (
    <>
      <div
        ref={bgRef}
        className={`flex flex-row items-center justify-center w-[90%] h-[90%] bg-play-detail-open-book bg-contain bg-no-repeat bg-center absolute ${animationClasses}`}
        onAnimationEnd={animationEndHandler}
      >
        <img
          alt="닫기"
          src={DetailClose}
          onClick={closeWithAnimation}
          className={`absolute top-[7%] right-[5%] min-w-[50px] min-h-[50px] max-w-[80px] max-h-[80px] cursor-pointer hover:scale-110 duration-[0.33s]`}
        />
        <div
          className="basis-[51%] h-full flex flex-col items-end justify-center pt-[6%] pb-[8%] bg-red-300 bg-opacity-60"
          style={{ width: `${customWidth}px` }}
        >
          <div className="basis-[10%]">{PlayTaleDetailData?.title}</div>
          <img
            alt="메인 이미지"
            src={PlayTaleDetailData?.mainImage}
            className="basis-[50%]"
          />
          <div className="basis-[20%]">진행도</div>
          <div className="basis-[20%] flex flex-row items=center justify-center">
            <div>버튼1</div>
            <div>버튼2</div>
          </div>
        </div>
        <div className="basis-[49%] w-full h-full flex items-center justify-center">
          우하하
        </div>
      </div>
    </>
  )
}

export default PlayTaleDetailCompo
