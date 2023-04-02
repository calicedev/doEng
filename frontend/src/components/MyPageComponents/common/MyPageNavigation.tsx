import React from "react"
import { HiUserCircle } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { TbArrowBigLeftFilled } from "react-icons/tb"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useUserData, useUserMutation } from "hooks/queries/queries"
import { DispatchToast } from "store"
import { tokenActions } from "store/tokenSlice"
import { passwordActions } from "store/passwordSlice"
import Logo from "components/UI/Logo"
import IconButton from "components/UI/IconButton"

/*
마이페이지(/mypage) 상단에 나오는 네비게이션 바
*/

export default function MyPageNavigation() {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { mutateAsync: logoutFunc } = useUserMutation()
  const logoutHandler = function () {
    logoutFunc({
      method: `delete`,
      url: `/api/member/logout`,
    })
      .then((res) => {
        console.log(res)
        dispatch(tokenActions.deleteTokens({}))
        dispatch(passwordActions.wrongPassword({}))
        dispatch(DispatchToast("로그아웃 성공!", true))
        navigate(`/`)
      })
      .catch((err) => {
        dispatch(tokenActions.deleteTokens({}))
        dispatch(passwordActions.wrongPassword({}))
        dispatch(DispatchToast("로그아웃에 실패하셨습니다.", false))
        navigate(`/member/login`)
      })
  }

  return (
    <div className="flex justify-between items-center px-4">
      <Logo />
      <div className={`flex gap-20`}>
        <IconButton
          icon={<TbArrowBigLeftFilled />}
          colorClass={`text-yellow-100`}
          label="메인으로"
          size="large"
          onClick={() => navigate("/")}
        />
        <IconButton
          icon={<HiUserCircle />}
          colorClass={`text-yellow-100`}
          label="로그아웃"
          size="large"
          onClick={logoutHandler}
        />
      </div>
    </div>
  )
}
