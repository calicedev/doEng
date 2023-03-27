import React from "react"
import Logo from "components/UI/Logo"
import IconButton from "components/UI/IconButton"
import { TbArrowBigLeftFilled } from "react-icons/tb"
import { HiUserCircle } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useUserData, useUserMutation } from "hooks/queries/queries"
import { tokenActions } from "store/tokenSlice"
import { DispatchToast } from "store"

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
        dispatch(DispatchToast("로그아웃 성공!", true))
      })
      .catch((err) => {
        console.log(err)
        dispatch(DispatchToast("로그아웃에 실패하셨습니다.", false))
      })
  }

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
          onClick={logoutHandler}
        />
      </div>
    </div>
  )
}
