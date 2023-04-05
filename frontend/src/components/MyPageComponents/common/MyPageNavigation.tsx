import { HiUserCircle } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { TbArrowBigLeftFilled } from "react-icons/tb"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useUserData, useUserMutation } from "hooks/queries/queries"
import { DispatchLogout, DispatchToast } from "store"
import { tokenActions } from "store/tokenSlice"
import { passwordActions } from "store/passwordSlice"
import Logo from "components/UI/Logo"
import IconButton from "components/UI/IconButton"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"

/*
마이페이지(/mypage) 상단에 나오는 네비게이션 바
*/
export default function MyPageNavigation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { mutateAsync: logoutFunc } = useUserMutation()
  const logoutHandler = function () {
    logoutFunc({
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

  return (
    <div className="flex justify-between items-center px-4">
      <div className="hover:rotate-[-3deg] duration-200 ease-in-out">
        <Logo />
      </div>
      <div className={`flex gap-20`}>
        <IconButton
          icon={<TbArrowBigLeftFilled />}
          color={`ivory`}
          label="메인으로"
          size="large"
          onClick={() => navigate("/")}
        />
        <IconButton
          icon={<HiUserCircle />}
          color={`ivory`}
          label="로그아웃"
          size="large"
          onClick={logoutHandler}
        />
      </div>
    </div>
  )
}
