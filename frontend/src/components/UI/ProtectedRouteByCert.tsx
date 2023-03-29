import { useUserData } from "hooks/queries/queries"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import MyPage from "pages/MyPage"
import SignPage from "pages/SignPage"
import { PropsWithChildren, useEffect } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { DispatchToast } from "store"
import { SpinnerDots } from "./Spinner"

interface Props {}

const ProtectedRouteByCert = function ({ children }: PropsWithChildren<Props>) {
  const { isCert } = useStoreSelector((state) => state.password)
  const dispatch = useStoreDispatch()

  return isCert ? <MyPage /> : <Navigate to={`/mypage`} />
}

export default ProtectedRouteByCert
