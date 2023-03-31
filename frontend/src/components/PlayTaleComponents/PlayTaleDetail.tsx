import AnimationBox, {
  textOneByOne,
  textOneByOnePpyong,
} from "components/UI/AnimationBox"
import { PlayTaleDetail, usePlayTaleDetail } from "hooks/queries/queries"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import DetailBackground from "../../assets/images/DetailBackground.png"
import DetailRightBackground from "../../assets/images/DetailRightBackground.png"
import DetailClose from "../../assets/images/DetailClose.png"
import { useAnimate } from "hooks/useAnimate"
import { useWidthHeight } from "hooks/useWidthHwight"
import Graph from "components/CanvasComponents/BarGraph/Graph"

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
  const onTestHandler = function () {
    navigate(`word-test/${taleId}`)
  }
  const graphRef = useRef<HTMLDivElement>(null)
  const { width: graphWidth, height: graphHeight } = useWidthHeight(graphRef)
  let titles = []
  if (PlayTaleDetailData?.title) {
    for (let v of PlayTaleDetailData?.title) {
      titles.push(v)
    }
  }

  const cardClasses = [
    "bottom-[3%] left-[18%] z-[5]",
    "bottom-[16%] right-[17%] z-[4]",
    "top-[35%] right-[43%] z-[3]",
    "top-[13%] left-[10%] z-[2]",
    "top-[4%] right-[20%] z-[1]",
  ]
  const cardAnimClasses = [
    "animate-[ppyong_0.33s_0.11s_both] z-[5]",
    "animate-[ppyong_0.33s_0.22s_both] z-[4]",
    "animate-[ppyong_0.33s_0.33s_both] z-[3]",
    "animate-[ppyong_0.33s_0.44s_both] z-[2]",
    "animate-[ppyong_0.33s_0.55s_both] z-[1]",
  ]

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
          className={`absolute top-[7%] right-[5%] min-w-[50px] min-h-[50px] max-w-[80px] max-h-[80px] cursor-pointer hover:scale-110 duration-[0.33s] z-50`}
        />
        <div
          className="h-full flex flex-col items-center justify-between pt-[5%] pb-[11.5%] bg-opacity-60 pr-[0.5%]"
          style={{ width: `${customWidth}px` }}
        >
          <div className="basis-[10%] h-full flex flex-row font-hopang-black text-[3rem]">
            {titles.map((val, idx) => (
              <AnimationBox
                appearClassName={textOneByOnePpyong[idx]}
                key={`tale-name-${idx}`}
              >
                {val}
              </AnimationBox>
            ))}
          </div>
          <AnimationBox
            boxClasses="basis-[50%] flex flex-row justify-end"
            appearClassName={`animate-[appear-opacity-softly_0.33s_0.25s_both]`}
          >
            <img
              alt="메인 이미지"
              src={PlayTaleDetailData?.mainImage}
              className="w-[98%] bg-img-gradient"
              // className="basis-[50%]"+
            />
          </AnimationBox>

          <div
            ref={graphRef}
            className="basis-[7%] w-full h-full flex items-center justify-center mb-[1.5%]"
          >
            <Graph
              canvasWidth={customWidth * 0.7}
              canvasHeight={graphHeight}
              bgColor={`rgba(255, 255, 255, 1)`}
              fillColor={`rgba(200, 100, 120, 1)`}
              maxPoint={PlayTaleDetailData?.sceneCount!}
              nowPoint={PlayTaleDetailData?.sceneOrder!}
            />
          </div>
          <div className="basis-[12%] w-full flex flex-row items-center justify-center gap-5 px-[8%] pb-[2%]">
            <AnimationBox
              boxClasses="basis-[44%] w-[44%] h-full"
              appearClassName="animate-[ppyong_0.33s_0.22s_both]"
            >
              <div
                className="w-full h-full flex items-center justify-center rounded-full cursor-pointer bg-lime-300 border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] "
                onClick={onContinueHandler}
              >
                Continue
              </div>
            </AnimationBox>
            <AnimationBox
              boxClasses="basis-[44%] w-[44%] h-full"
              appearClassName="animate-[ppyong_0.33s_0.55s_both]"
            >
              <div
                className="w-full h-full flex items-center justify-center rounded-full cursor-pointer bg-lime-300 border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]"
                onClick={onRestartHandler}
              >
                Restart
              </div>
            </AnimationBox>
          </div>
        </div>
        <div className="h-full flex flex-col items-center justify-end pt-[5%] pb-[11.5%] bg-opacity-60 pl-[1.7%]">
          <div
            className="basis-[90%] w-full h-full bg-cover bg-no-repeat bg-clip-content bg-right bg-play-detail-right-osolgil relative"
            style={{ width: `${customWidth}px` }}
          >
            {PlayTaleDetailData?.wordList.map((playWord, idx) => (
              <AnimationBox
                boxClasses={`h-[30%] w-[23%] absolute ${cardClasses[idx]}`}
                appearClassName={`${cardAnimClasses[idx]}`}
                key={`play-tale-anim-box-${idx}`}
              >
                <div
                  key={`play-tale-card-${idx}`}
                  className={`h-full w-full bg-gray-400 border-amber-700 border-[3px] shadow-amber-900 shadow-lg bg-opacity-50 cursor-pointer  rounded-[8px] duration-[0.33s] hover:scale-[105%]`}
                >
                  답은...{playWord.engWord}
                </div>
              </AnimationBox>
            ))}
          </div>
          <div className="basis-[12%] w-full flex flex-row items-center justify-center gap-5 px-[8%] pb-[2%]">
            <AnimationBox
              boxClasses="basis-[49%] w-[44%] h-full"
              appearClassName="animate-[ppyong_0.33s_0.77s_both]"
            >
              <div
                className="flex items-center justify-center rounded-full cursor-pointer bg-lime-300 h-full border-[5px] border-lime-500 shadow-lg duration-[0.33s] hover:scale-[107%] font-jalnan text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem]"
                onClick={onTestHandler}
              >
                Test
              </div>
            </AnimationBox>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayTaleDetailCompo
