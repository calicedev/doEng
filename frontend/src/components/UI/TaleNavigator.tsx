import TaleNavLogo from "../../assets/images/TaleNavLogo.png"
import Tutorial from "../../assets/images/TaleNav1Tutorial.png"
import Cards from "../../assets/images/TaleNav2Cards.png"
import MyPage from "../../assets/images/TaleNav3MyPage.png"
import NavLogout from "../../assets/images/LogoutIcon.png"
// import TaleNavLogoContainer from "../../assets/images/TaleNavLogoContainer.png"
import AnimationBox from "./AnimationBox"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserMutation } from "hooks/queries/queries"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { tokenActions } from "store/tokenSlice"
import { passwordActions } from "store/passwordSlice"
import { DispatchLogout, DispatchToast } from "store"
import { PropsWithChildren, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"

interface hoverProps {
  isOpen: boolean
  description: string
  x: number
  y: number
}

const MouseDescription = function ({
  isOpen,
  description,
  x,
  y,
}: PropsWithChildren<hoverProps>) {
  return (
    <>
      {ReactDOM.createPortal(
        <AnimationBox
          isOpened={isOpen}
          boxClasses="fixed z-[180] w-10 h-10"
          appearClassName="animate-[appear-opacity-softly_0.33s_ease-in-out_0.11s_both]"
          disappearClassName="animate-[disappear-opacity-softly_0.33s_ease-in-out_0.11s_both]"
        >
          <div
            className="w-[140px] bg-white rounded-[8px] px-3 py-2 bg-opacity-70 translate-x-[-105%] flex items-center justify-center"
            style={{
              position: `fixed`,
              left: `${x + 10}px`,
              top: `${y + 10}px`,
              zIndex: `101`,
            }}
          >
            {description}
          </div>
        </AnimationBox>,
        document.getElementById("backdrop-root")!,
      )}
    </>
  )
}

const TaleNavigator = function () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { mutateAsync: logoutMutate } = useUserMutation()
  const { pathname } = useLocation() // `/playtale/word/collect`
  console.log(pathname)

  const pushHome = function () {
    navigate(`/`)
  }
  const pushMyPage = function () {
    navigate(`/mypage/progress`)
  }

  const pushWordCollect = function () {
    if (pathname === `/playtale/word/collect`) {
      navigate(`/playtale`)
    } else {
      navigate(`/playtale/word/collect`)
    }
  }
  const logoutHandler = function () {
    logoutMutate({
      method: `delete`,
      url: `/api/member/logout`,
    })
      .then((res) => {
        queryClient.removeQueries(queryKeys.user())
        dispatch(DispatchLogout())
        dispatch(DispatchToast("로그아웃 성공!", true))
        navigate(`/member/login`)
      })
      .catch((err) => {
        queryClient.removeQueries(queryKeys.user())
        dispatch(DispatchLogout())
        dispatch(DispatchToast("로그아웃에 실패하셨습니다.", false))
        navigate(`/member/login`)
      })
  }
  const [description, setDescription] = useState<string>("")
  const [XY, setXY] = useState<{ x: number; y: number }>({ x: -500, y: -500 })
  const [descOpen, setDescOpen] = useState<boolean>(false)

  const changeXY = function (e: any) {
    setXY(() => {
      return { x: e.clientX, y: e.clientY }
    })
  }
  const changeWordDesc = function () {
    setDescOpen(() => true)
    setDescription(() =>
      pathname === `/playtale/word/collect` ? `동화 목록` : `단어장`,
    )
  }
  const changeMyPageDesc = function () {
    setDescOpen(() => true)
    setDescription(() => `마이 페이지`)
  }
  const changeLogoutDesc = function () {
    setDescOpen(() => true)
    setDescription(() => `로그아웃`)
  }
  const desClose = function () {
    setDescOpen(() => false)
  }

  return (
    <>
      <MouseDescription
        isOpen={descOpen}
        description={description}
        x={XY.x}
        y={XY.y}
      />
      <div className="box-border fixed top-0 left-0 w-full h-[13.3%] flex flex-row justify-between py-3 px-5 z-50">
        <AnimationBox appearClassName="animate-appear-top-nav">
          <div
            className={`flex justify-center items-center w-auto h-full bg-tale-nav-logo-container bg-contain bg-no-repeat py-2 cursor-pointer hover:scale-[103%] duration-[0.22s]`}
            onClick={pushHome}
          >
            <img alt={`nav-logo`} src={TaleNavLogo} className="h-full" />
          </div>
        </AnimationBox>

        <div className="flex flex-row items-center justify-center gap-2 mobile:gap-3 lg:gap-5 w-auto box-border">
          <AnimationBox
            boxClasses="h-[90%]"
            appearClassName="animate-[appear-top-nav_0.66s_0.22s_both]"
          >
            {/* <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="tutorial"
            src={Tutorial}
          /> */}
          </AnimationBox>
          <AnimationBox
            boxClasses="h-[90%]"
            appearClassName="animate-[appear-top-nav_0.66s_0.33s_both]"
          >
            <img
              className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
              alt="cards"
              src={Cards}
              onClick={pushWordCollect}
              onMouseEnter={changeWordDesc}
              onMouseLeave={desClose}
              onMouseMove={changeXY}
            />
          </AnimationBox>
          <AnimationBox
            boxClasses="h-[90%]"
            appearClassName="animate-[appear-top-nav_0.66s_0.44s_both]"
          >
            <img
              className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
              alt="my-page"
              src={MyPage}
              onClick={pushMyPage}
              onMouseEnter={changeMyPageDesc}
              onMouseLeave={desClose}
              onMouseMove={changeXY}
            />
          </AnimationBox>
          <AnimationBox
            boxClasses="h-[90%]"
            appearClassName="animate-[appear-top-nav_0.66s_0.55s_both]"
          >
            <img
              className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
              alt="my-page"
              src={NavLogout}
              onClick={logoutHandler}
              onMouseEnter={changeLogoutDesc}
              onMouseLeave={desClose}
              onMouseMove={changeXY}
            />
          </AnimationBox>
        </div>
      </div>
    </>
  )
}

export default TaleNavigator
