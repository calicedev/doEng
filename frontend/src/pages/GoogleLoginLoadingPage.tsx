import { SpinnerDots } from "../components/UI/Spinner"
// import { useStoreDispatch } from "../hooks/useStoreSelector"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import apiRequest from "../utils/axios"
import LoadingPage from "./LoadingPage"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { googleActions } from "store/googleSlice"
import { passwordActions } from "store/passwordSlice"

const GoogleLoginLoadingPage = function () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useStoreDispatch()
  useEffect(
    function () {
      const code = searchParams.get(`code`)
      if (code) {
        apiRequest({
          method: `get`,
          // baseURL: `http://localhost:8200`,
          url: `/api/auth/login/code/GOOGLE/callback`,
          params: {
            code,
          },
        })
          .then((res) => {
            console.log(res)
            if (res.data.type === "login") {
              dispatch(googleActions.resetGoogleSlice({}))
              dispatch(passwordActions.setGoogle({}))
              navigate(`/`)
            } else if (res.data.type === "signup") {
              dispatch(
                googleActions.setGoogleSlice({
                  gId: `${res.data.memberId}`,
                  gmail: `${res.data.email}`,
                  gname: `${res.data.name}`,
                }),
              )
              navigate("/member/google/info")
              return res
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    [searchParams],
  )
  return <LoadingPage loadingText="구글 로그인 진행중..." />
}

export default GoogleLoginLoadingPage
