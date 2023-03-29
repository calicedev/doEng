import { useState, useEffect, useRef } from "react"
import { useWidthHeight } from "hooks/useWidthHwight"
import LoadingComp from "components/UI/LoadingComp"
import CommonLoading from "components/UI/CommonLoading"
import { useNavigate } from "react-router-dom"
import Tutorial from "../assets/images/TaleNav1Tutorial.png"
import GoHome from "../assets/images/GoHome.png"
import Login from "../assets/images/TaleNav2Cards.png"

const NotFoundPage = function () {
  const navigate = useNavigate()
  const divRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWidthHeight(divRef)

  const goHome = function () {
    navigate("/")
  }
  const goBack = function () {
    navigate(-1)
  }
  const goLogin = function () {
    navigate("/member/login")
  }

  return (
    <>
      <CommonLoading>
        <div className="font-hopang-black text-[48px]">페이지가 없습니다!</div>
        <br />
        <div className="relative flex flex-row gap-3">
          <div
            className="absolute cursor-pointer top-[5%] left-[0%] translate-x-[-50%] basis-[33%] w-[33%] flex items-center justify-center flex-col font-jalnan text-[26px] gap-3 hover:scale-110 duration-[0.33s]"
            onClick={goHome}
          >
            <img alt="홈" src={GoHome} />
            홈으로
          </div>
          <div
            className="absolute cursor-pointer top-[5%] left-[50%] translate-x-[-50%] basis-[33%] w-[33%] flex items-center justify-center flex-col font-jalnan text-[26px] gap-3 hover:scale-110 duration-[0.33s]"
            onClick={goLogin}
          >
            <img alt="로그인" src={Login} />
            로그인
          </div>
          <div
            className="absolute cursor-pointer top-[5%] left-[100%] translate-x-[-50%] basis-[33%] w-[33%] flex items-center justify-center flex-col font-jalnan text-[26px] gap-3 hover:scale-110 duration-[0.33s]"
            onClick={goBack}
          >
            <img alt="뒤로" src={Tutorial} />
            뒤로
          </div>
        </div>
      </CommonLoading>
    </>
  )
}

export default NotFoundPage
