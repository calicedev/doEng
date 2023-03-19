import React from "react"
import Logo from "components/UI/Logo"
import IconButton from "components/UI/IconButton"
import { TbArrowBigLeftFilled } from "react-icons/tb"
import { HiUserCircle } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

/*
마이페이지(/mypage) 상단에 나오는 네비게이션 바
*/

export default function MyPageNavigation() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center">
      <Logo width={`170px`} />
      <div className={`flex gap-10`}>
        <IconButton
          icon={<TbArrowBigLeftFilled />}
          colorClass={`text-yellow-100`}
          label="메인으로"
          onClick={(e) => navigate("/")}
        />
        <IconButton
          icon={<HiUserCircle />}
          colorClass={`text-yellow-100`}
          label="로그아웃"
          onClick={(e) => navigate("/join/login")}
        />
      </div>
    </div>
  )
}
