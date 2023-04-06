import TaleNavLogo from "../../assets/images/TaleNavLogo.png"
import Tutorial from "../../assets/images/TaleNav1Tutorial.png"
import Cards from "../../assets/images/TaleNav2Cards.png"
import MyPage from "../../assets/images/TaleNav3MyPage.png"
import NavLogout from "../../assets/images/LogoutIcon.png"
// import TaleNavLogoContainer from "../../assets/images/TaleNavLogoContainer.png"
import AnimationBox from "./AnimationBox"
import { Navigate, useNavigate } from "react-router-dom"
import { useUserData, useUserMutation } from "hooks/queries/queries"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { tokenActions } from "store/tokenSlice"
import { passwordActions } from "store/passwordSlice"
import { DispatchLogout, DispatchToast } from "store"
import { PropsWithChildren, useState, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import LoadingPage from "pages/LoadingPage"
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
const HomeNavigator = function ({
  isOpen = true,
  appearClassName = "",
  disappearClassName = "",
}) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { data: userData, isLoading, isError } = useUserData()
  const { mutateAsync: logoutMutate } = useUserMutation()
  const pushHome = function () {
    navigate(`/`)
  }
  const pushMyPage = function () {
    navigate(`/mypage/progress`)
  }

  const pushPlayTale = function () {
    navigate(`/playtale`)
  }
  const loginNLogoutHandler = function () {
    if (userData?.id) {
      logoutMutate({
        method: `delete`,
        url: `/api/member/logout`,
      })
        .then((res) => {
          queryClient.removeQueries(queryKeys.user())
          dispatch(DispatchLogout())
          dispatch(DispatchToast("로그아웃 성공!", true))
        })
        .then(() => {
          navigate(`/member/login`)
        })
        .catch((err) => {
          queryClient.removeQueries(queryKeys.user())
          dispatch(DispatchLogout())
          dispatch(DispatchToast("로그아웃에 실패하셨습니다.", false))
          navigate(`/member/login`)
        })
    } else {
      navigate(`/member/login`)
    }
  }
  const [description, setDescription] = useState<string>("")
  const [XY, setXY] = useState<{ x: number; y: number }>({ x: -500, y: -500 })
  const [descOpen, setDescOpen] = useState<boolean>(false)

  const changeXY = function (e: any) {
    setXY(() => {
      return { x: e.clientX, y: e.clientY }
    })
  }
  const changeWordDesc = useCallback(function () {
    setDescOpen(() => true)
    setDescription(() => `내 동화`)
  }, [])
  const changeMyPageDesc = useCallback(function () {
    setDescOpen(() => true)
    setDescription(() => `마이 페이지`)
  }, [])
  const changeLogoutDesc = useCallback(function () {
    setDescOpen(() => true)
    if (userData?.id) {
      setDescription(() => `로그아웃`)
    } else {
      setDescription(() => `로그인`)
    }
  }, [])
  const desClose = function () {
    setDescOpen(() => false)
  }

  // if (isLoading) {
  //   return <LoadingPage />
  // }
  return (
    <>
      <MouseDescription
        isOpen={descOpen}
        description={description}
        x={XY.x}
        y={XY.y}
      />
      <div className="box-border fixed top-0 left-0 w-full h-[13.3%] flex flex-row py-3 px-5 justify-end">
        <AnimationBox
          isOpened={isOpen}
          boxClasses={`left-0 mx-5 ${
            isOpen ? `h-[13.3%] fixed` : `h-full absolute`
          }`}
          appearClassName="animate-appear-top-nav"
          disappearClassName="animate-disappear-top-nav"
        >
          <div
            className={`flex justify-center items-center w-auto h-full bg-tale-nav-logo-container bg-contain bg-no-repeat py-2 cursor-pointer hover:scale-[103%] duration-[0.22s]`}
            onClick={pushHome}
          >
            <img alt={`nav-logo`} src={TaleNavLogo} className="h-full" />
          </div>
        </AnimationBox>
        {/* <div className="w-flex-1"></div> */}

        <div className="flex flex-row items-center justify-end gap-2 mobile:gap-3 lg:gap-5 w-auto box-border right-0 top-0 relative">
          <AnimationBox
            isOpened={isOpen}
            boxClasses="h-[90%] relative top-0 right-0"
            appearClassName="animate-[appear-top-nav_0.66s_0.22s_both]"
            disappearClassName="animate-[disappear-top-nav_0.66s_0.22s_both]"
          >
            {/* <img
            className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
            alt="tutorial"
            src={Tutorial}
          /> */}
          </AnimationBox>
          <AnimationBox
            isOpened={isOpen}
            boxClasses="h-[90%] relative top-0 right-0"
            appearClassName="animate-[appear-top-nav_0.66s_0.33s_both]"
            disappearClassName="animate-[disappear-top-nav_0.66s_0.33s_both]"
          >
            <img
              className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
              alt="cards"
              src={Cards}
              onClick={pushPlayTale}
              onMouseEnter={changeWordDesc}
              onMouseLeave={desClose}
              onMouseMove={changeXY}
            />
          </AnimationBox>
          <AnimationBox
            isOpened={isOpen}
            boxClasses="h-[90%] relative top-0 right-0"
            appearClassName="animate-[appear-top-nav_0.66s_0.44s_both]"
            disappearClassName="animate-[disappear-top-nav_0.66s_0.44s_both]"
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
            isOpened={isOpen}
            boxClasses="h-[90%] relative top-0 right-0"
            appearClassName="animate-[appear-top-nav_0.66s_0.55s_both]"
            disappearClassName="animate-[disappear-top-nav_0.66s_0.55s_both]"
          >
            <img
              className="h-full cursor-pointer hover:scale-[106%] duration-[0.22s]"
              alt="my-page"
              src={NavLogout}
              onClick={loginNLogoutHandler}
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

export default HomeNavigator
