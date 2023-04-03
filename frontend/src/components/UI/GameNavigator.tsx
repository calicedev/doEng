import GoHome from "../../assets/images/GoHome.png"
import Tutorial from "../../assets/images/TaleNav1Tutorial.png"
import Pause from "../../assets/images/Pause.png"
import Cards from "../../assets/images/TaleNav2Cards.png"
import MyPage from "../../assets/images/TaleNav3MyPage.png"
// import TaleNavLogoContainer from "../../assets/images/TaleNavLogoContainer.png"
import AnimationBox from "./AnimationBox"
import { useNavigate } from "react-router-dom"
import { PropsWithChildren } from "react"

interface Props {
  toggleKor: () => void
  togglePause: () => void
}

const GameNavigator = function ({
  toggleKor,
  togglePause,
}: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const pushHome = function () {
    navigate(`/`)
  }
  const pauseHandler = function () {
    togglePause()
  }
  const toggleKorHandler = function () {
    toggleKor()
  }

  return (
    <div className="box-border fixed top-0 left-0 w-full h-[13.3%] flex flex-row justify-between py-3 px-5 z-[100]">
      <AnimationBox appearClassName="animate-appear-top-nav">
        <div
          className={`flex justify-center items-center w-auto h-full py-2 cursor-pointer hover:scale-[103%] duration-[0.22s]`}
          onClick={pushHome}
        >
          <img alt={`nav-logo`} src={GoHome} className="h-full" />
        </div>
      </AnimationBox>

      <div className="flex flex-row items-center justify-center gap-2 mobile:gap-3 lg:gap-5 w-auto box-border">
        <AnimationBox
          boxClasses="h-[90%]"
          appearClassName="animate-[appear-top-nav_0.66s_0.22s_both]"
        >
          <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="tutorial"
            src={Tutorial}
            onClick={toggleKorHandler}
          />
        </AnimationBox>
        <AnimationBox
          boxClasses="h-[90%]"
          appearClassName="animate-[appear-top-nav_0.66s_0.33s_both]"
        >
          <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="my-page"
            src={Pause}
            onClick={pauseHandler}
          />
        </AnimationBox>
      </div>
    </div>
  )
}

export default GameNavigator
