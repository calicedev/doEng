import { useUserQuery } from "hooks/queries/user"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import SignPage from "pages/SignPage"
import { PropsWithChildren, useEffect } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { DispatchToast } from "store"
import { SpinnerDots } from "./Spinner"

interface Props {}

const ProtectedRoute = function ({ children }: PropsWithChildren<Props>) {
  const { isLoading, data } = useUserQuery()
  const dispatch = useStoreDispatch()
  useEffect(
    function () {
      if (isLoading) {
        return
      }
      if (!data?.id) {
        dispatch(
          DispatchToast("세션이 만료되었습니다. 다시 로그인 해주세요.", false),
        )
      }
    },
    [isLoading, data?.id],
  )
  return isLoading ? (
    <SpinnerDots />
  ) : data?.id ? (
    <Outlet />
  ) : (
    <Navigate to={`/member/login`} />
  )
}

export default ProtectedRoute
