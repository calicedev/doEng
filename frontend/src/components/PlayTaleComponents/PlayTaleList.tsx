import AnimationBox from "components/UI/AnimationBox"
import PanDDaegi from "../../assets/images/PanDDaegi.png"
import DDuGGung from "../../assets/images/PanDDuGGung.png"

const PlayTaleList = function () {
  return (
    <>
      <div className="canvas-under-bg-container h-full w-full flex items-center justify-center">
        <AnimationBox
          boxClasses="h-full w-full flex items-center justify-center"
          appearClassName="animate-[appear-from-bottom-with-bounce_0.66s_0.44s_both]"
        >
          <img alt="bg" src={PanDDaegi} className="h-[90%]" />
        </AnimationBox>
      </div>
      <div className="canvas-under-bg-container w-full relative top-0">
        <AnimationBox
          boxClasses="h-full w-full flex items-center justify-center"
          appearClassName="animate-[appear-from-bottom-with-bounce-second_0.66s_0.44s_both]"
        >
          <img alt="dg" src={DDuGGung} className="" />
        </AnimationBox>
      </div>
    </>
  )
}

export default PlayTaleList
