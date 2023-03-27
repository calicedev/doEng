import { SpinnerDots } from "../components/UI/Spinner"
// import { useStoreDispatch } from "../hooks/useStoreSelector"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import apiRequest from "../utils/axios"

const GoogleLoginLoadingPage = function () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  useEffect(
    function () {
      const code = searchParams.get(`code`)
      if (code) {
        apiRequest({
          method: `get`,
          baseURL: `http://localhost:8200`,
          url: `/api/auth/login/code/GOOGLE/callback`,
          params: {
            code,
          },
        }).then((res) => {
          console.log(res)
        })
      }
    },
    [searchParams],
  )
  return <SpinnerDots />
}

export default GoogleLoginLoadingPage
