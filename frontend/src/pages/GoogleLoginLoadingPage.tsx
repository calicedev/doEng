import { SpinnerDots } from "../components/UI/Spinner"
// import { useStoreDispatch } from "../hooks/useStoreSelector"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { tokenActions } from "store/tokenSlice"
import LoadingPage from "./LoadingPage"

const GoogleLoginLoadingPage = function () {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(
    function () {
      const code = searchParams.get(`code`)
      if (code) {
        axios({
          method: `get`,
          baseURL: `https://j8a601.p.ssafy.io`,
          // baseURL: `http://localhost:8200`,
          url: `/api/auth/login/code/GOOGLE/callback`,
          params: {
            code,
          },
        })
          .then((res) => {
            console.log(res)
            navigate("/")
            dispatch(
              tokenActions.setAccessToken({
                accessToken: res.headers[`accesstoken`],
              }),
            )
            dispatch(
              tokenActions.setRefreshToken({
                refreshToken: res.headers[`refreshtoken`],
              }),
            )
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
