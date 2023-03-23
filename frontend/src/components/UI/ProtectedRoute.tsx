import { useUserQuery } from "hooks/queries/user"
import { useStoreSelector } from "hooks/useStoreSelector"
import SignPage from "pages/SignPage"
import { PropsWithChildren, useEffect } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { SpinnerDots } from "./Spinner"

interface Props {}

const ProtectedRoute = function ({ children }: PropsWithChildren<Props>) {
  const { isLoading, data } = useUserQuery()
  return isLoading ? (
    <SpinnerDots />
  ) : data?.id ? (
    <Outlet />
  ) : (
    <Navigate to={`/member/login`} />
  )
}

export default ProtectedRoute
