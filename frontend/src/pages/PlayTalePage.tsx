import AnimationBox from "components/UI/AnimationBox"
import TaleNavigator from "components/UI/TaleNavigator"
import { Outlet, useParams } from "react-router-dom"

const PlayTalePage = function () {
  const { taleId, sceneOrder } = useParams()
  return (
    <>
      {/* <div className="canvas-under-bg-container w-full h-full"> */}
      {/* <AnimationBox boxClasses="fixed top-[50%] left-[30%]">
          <div className=" h-auto w-auto bg-red-700 -skew-x-[20deg] skew-y-[20deg] animate-salangsalang-left">
            ㅎㅇ
          </div>
        </AnimationBox> */}
      {/* </div> */}
      <div className="box-border h-full w-full flex items-center justify-center">
        <Outlet />
      </div>
    </>
  )
}

export default PlayTalePage
