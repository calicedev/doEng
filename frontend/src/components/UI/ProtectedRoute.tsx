import { useUserQuery } from "hooks/queries/user"
import { useStoreSelector } from "hooks/useStoreSelector"
import SignPage from "pages/SignPage"
import { PropsWithChildren } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"

interface Props {}

const ProtectedRoute = function ({ children }: PropsWithChildren<Props>) {
  const { data } = useUserQuery()

  return !data?.id ? <Outlet /> : <Navigate to={`/member/login`} />
}

export default ProtectedRoute
