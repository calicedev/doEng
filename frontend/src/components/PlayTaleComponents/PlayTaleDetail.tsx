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
      setCustomWidth(() => height * 0.57)
    },
    [height],
  )
  const onRestartHandler = function () {
    navigate(`${taleId}/1`)
  }
  const onContinueHandler = function () {
    navigate(`${taleId}/${PlayTaleDetailData?.sceneOrder}`)
  }
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
          className="h-full flex flex-col items-center justify-center pt-[5%] pb-[11%] bg-opacity-60 pr-[1.7%]"
          style={{ width: `${customWidth}px` }}
        >
          <div className="basis-[10%] font-hopang-black text-[3.3rem]">
            {PlayTaleDetailData?.title}
          </div>
          <img
            alt="메인 이미지"
            src={PlayTaleDetailData?.mainImage}
            className="basis-[50%]"
          />
          <div className="basis-[8.9%] flex items-center justify-center">
            진행도
          </div>
          <div className="basis-[10%] w-full flex flex-row items-center justify-center gap-5 px-[8%] pb-[2%]">
            <div
              className="basis-[44%] w-[44%] flex items-center justify-center rounded-full cursor-pointer bg-lime-300 h-full border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]"
              onClick={onContinueHandler}
            >
              Continue
            </div>
            <div
              className="basis-[44%] w-[44%] flex items-center justify-center rounded-full cursor-pointer bg-lime-300 h-full border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]"
              onClick={onRestartHandler}
            >
              Restart
            </div>
          </div>
        </div>
        <div
          className="h-full flex flex-col items-center justify-center pt-[5%] pb-[11%] bg-opacity-60 pl-[1.7%] bg-red-300 bg-contain bg-no-repeat bg-clip-content bg-right"
          // bg-play-detail-right-osolgil
          style={{ width: `${customWidth}px` }}
        >
          <img
            alt="오솔길"
            src={DetailRightBackground}
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </>
  )
}

export default PlayTaleDetailCompo
