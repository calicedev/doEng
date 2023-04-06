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
import SuperHeroLanding from "components/PlayTaleComponents/SuperHeroLanding"
import Background from "assets/images/Background.png"
import LeftTreeLeaves from "assets/images/left_wood_leaves.png"
import LeftWood from "assets/images/left_wood.png"
import LeftBottom from "assets/images/left_leaves.png"
import LeftLeaf from "assets/images/left_leaf.png"
import RightTreeLeaves from "assets/images/right_wood_leaves.png"
import RightWood from "assets/images/right_wood.png"
import RightBottom from "assets/images/right_leaves.png"
import RightLeaf from "assets/images/right_leaf.png"
import { FaArrowAltCircleUp } from "react-icons/fa"

function HomePage() {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const canvasDivRef = useRef<HTMLDivElement>(null)
  const { width: canvasWidth, height: canvasHeight } =
    useWidthHeight(canvasDivRef)
  const [scrollY, setScrollY] = useState<number>(0)
  const [isNav, setIsNav] = useState<boolean>(true)
  const [isTree, setIsTree] = useState<boolean>(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 내비게이션 바 온오프
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
  const secondPageScrollTracking = useCallback(
    function () {
      if (!scrollContainerRef.current) {
        return
      }
      if (scrollContainerRef.current?.scrollTop > window.innerHeight) {
        setIsTree(() => true)
      } else {
        console.log(isTree, "나무 오프")
        setIsTree(() => false)
      }
    },
    [scrollContainerRef.current],
  )
  const scrollAllFn = useCallback(
    function () {
      scrollTracking()
      secondPageScrollTracking()
    },
    [scrollTracking, secondPageScrollTracking],
  )
  // 마우스 추적
  useEffect(function () {
    scrollContainerRef.current?.addEventListener(`scroll`, scrollAllFn)
    return function () {
      scrollContainerRef.current?.removeEventListener(`scroll`, scrollAllFn)
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
        className={`w-full h-full canvas-under-bg-container`}
      >
        <Wave canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </div> */}
      {/* <img
        alt="배경"
        src={Background}
        className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
      /> */}

      <AnimationBox
        isOpened={isNav}
        boxClasses="h-auto w-full absolute"
        appearClassName="animate-[appear-top-nav_0.66s_both]"
        disappearClassName="animate-[disappear-top-nav_0.66s_both]"
      >
        <img src={NavBack} className="static translate-y-[-50%]" />
      </AnimationBox>
      <HomeNavigator isOpen={isNav} />
      {/* 좌덤불 */}
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute top-0 left-0 w-[30%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_0.11s_both]"
        disappearClassName="animate-[disappear-from-left-with-bounce_0.33s_0.11s_both]"
      >
        <img alt="좌상단" src={LeftTreeLeaves} className="w-full z-[100]" />
      </AnimationBox>
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute left-0 w-[18%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_0.22s_both]"
        disappearClassName="animate-[disappear-from-left-with-bounce_0.33s_0.22s_both]"
      >
        <img
          alt="좌나무"
          src={LeftWood}
          className="w-full h-[88vh] translate-y-[11%]"
        />
      </AnimationBox>
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute left-0 bottom-0 w-[28%]"
        appearClassName="animate-[appear-from-left-with-bounce_0.33s_0.44s_both]"
        disappearClassName="animate-[disappear-from-left-with-bounce_0.33s_0.44s_both]"
      >
        <img alt="좌덤불" src={LeftBottom} className="w-full" />
      </AnimationBox>

      {/* 우덤불 */}
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute right-0 top-0 w-[33%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_0.11s_both]"
        disappearClassName="animate-[disappear-from-right-with-bounce_0.33s_0.11s_both]"
      >
        <img alt="우상단" src={RightTreeLeaves} className="w-full scale-110 " />
      </AnimationBox>
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute right-0 w-[22.5%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_0.22s_both]"
        disappearClassName="animate-[disappear-from-right-with-bounce_0.33s_0.22s_both]"
      >
        <img
          alt="우나무"
          src={RightWood}
          className="w-full h-[88vh] translate-y-[12%]"
        />
      </AnimationBox>
      <AnimationBox
        isOpened={isTree}
        boxClasses="absolute right-0 bottom-0 w-[28%]"
        appearClassName="animate-[appear-from-right-with-bounce_0.33s_0.44s_both]"
        disappearClassName="animate-[disappear-from-right-with-bounce_0.33s_0.44s_both]"
      >
        <img alt="우하단" src={RightBottom} className="w-full" />
      </AnimationBox>

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
        className="fixed bottom-[7%] right-[5%] cursor-pointer w-[66px] h-[66px] animate-bounce"
        onClick={goUp}
      >
        <FaArrowAltCircleUp className="h-full w-full text-yellow-300 hover:scale-110 duration-[0.33s]" />
      </div>
    </div>
  )
}

export default HomePage
