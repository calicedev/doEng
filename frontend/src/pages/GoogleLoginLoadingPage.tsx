import { SpinnerDots } from "../components/UI/Spinner"
// import { useStoreDispatch } from "../hooks/useStoreSelector"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import apiRequest from "../utils/axios"
import LoadingPage from "./LoadingPage"

const GoogleLoginLoadingPage = function () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
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
            navigate("/")
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
