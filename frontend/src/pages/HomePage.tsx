import { useRef, useEffect, useState, useCallback } from "react"
import Wave from "../components/CanvasComponents/Wave/Wave"
import { useWidthHeight } from "../hooks/useWidthHwight"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useNavigate } from "react-router-dom"
import LoadingComp from "components/UI/LoadingComp"
import { useUserData } from "hooks/queries/queries"
import HomeNavigator from "components/UI/HomeNavigator"
import NavBack from "assets/images/intro/bg001-removebg.png"
import One from "assets/images/intro/001.png"
import Two from "assets/images/intro/002.png"
import Three from "assets/images/intro/003.png"
import Four from "assets/images/intro/004.png"
import Five from "assets/images/intro/005.png"
import AnimationBox from "components/UI/AnimationBox"

function HomePage() {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const canvasDivRef = useRef<HTMLDivElement>(null)
  // const [mouseX, setMouseX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [isNav, setIsNav] = useState<boolean>(true)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollTracking = useCallback(
    function () {
      if (
        (scrollContainerRef.current?.scrollTop || 0) <
        window.innerHeight * 0.2
      ) {
        setIsNav(() => true)
      } else {
        setIsNav(() => false)
      }
    },
    [scrollContainerRef.current],
  )
  // 마우스 추적
  useEffect(function () {
    scrollContainerRef.current?.addEventListener(`scroll`, scrollTracking)
    return function () {
      scrollContainerRef.current?.removeEventListener(`scroll`, scrollTracking)
    }
  }, [])

  // 마우스에 따른 nav open 설정
  useEffect(
    function () {
      if (window.scrollY < window.innerHeight * 0.15) {
        setIsNav(() => true)
      } else {
        setIsNav(() => false)
      }
    },
    [window.scrollY],
  )
  const imgRef = useRef<HTMLImageElement>(null)
  const goUp = function () {
    imgRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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
    <div
      ref={scrollContainerRef}
      className="h-full w-full box-border overflow-y-scroll"
    >
      {/* <div
        ref={canvasDivRef}
        className={`w-full h-full blur-sm canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div> */}
      <AnimationBox
        isOpened={isNav}
        boxClasses="h-auto w-full absolute"
        appearClassName="animate-[appear-top-nav_0.66s_both]"
        disappearClassName="animate-[disappear-top-nav_0.66s_both]"
      >
        <img src={NavBack} className="static translate-y-[-50%]" />
      </AnimationBox>
      <HomeNavigator isOpen={isNav} />
      <div
        className={`box-border h-full w-full flex flex-col items-center justify-start gap-4`}
      >
        <img ref={imgRef} src={One} className="w-[50%]" />
        <img src={Two} className="w-[50%]" />
        <img src={Three} className="w-[50%]" />
        <img src={Four} className="w-[50%]" />
        <img src={Five} className="w-[50%]" />
      </div>
      <div
        className="fixed bottom-[5%] right-[5%] cursor-pointer"
        onClick={goUp}
      >
        위로 가기
      </div>
    </div>
  )
}

export default HomePage
