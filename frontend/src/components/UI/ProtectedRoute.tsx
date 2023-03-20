import { useStoreSelector } from "hooks/useStoreSelector"
import SignPage from "pages/SignPage"
import { PropsWithChildren } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"

interface Props {}

const ProtectedRoute = function ({ children }: PropsWithChildren<Props>) {
  const { isLogin } = useStoreSelector((state) => state.user)
  // return isLogin ? <Outlet /> : <Navigate to={`/member/login`} />
  return isLogin ? <Outlet /> : <Navigate to={`/member/login`} />
}

export default ProtectedRoute
