import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import store, { DispatchToast } from "store/index"
import { tokenActions } from "store/tokenSlice"

/*
서버에 요청을 날리는 axios instance
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
*/
const interceptorRequest = axios.create({
  // baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
  baseURL: "http://70.12.246.176:8200", // 서버 주소
  withCredentials: true, // 쿠키 사용을 위해 설정
  timeout: 10000, // 10초까지만 대기
})

const apiRequest = axios.create({
  // baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
  baseURL: "http://70.12.246.176:8200", // 서버 주소
  withCredentials: true, // 쿠키 사용을 위해 설정
  timeout: 10000, // 10초까지만 대기
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    const state = store.getState() // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken // 리덕스 accessToken 읽기
    // const refreshToken = state.token.refreshToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // 리덕스에 accessToken이 있을 경우 Authorization 헤더 추가
    }
    // if (refreshToken) {
    //   config.headers.common[`refreshtoken`] = `Bearer ${refreshToken}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (res: AxiosResponse) => {
    const newAccessToken = res.headers["accesstoken"] || res.data?.accesstoken
    const newRefreshToken =
      res.headers["refreshtoken"] || res.data?.refreshtoken
    if (newAccessToken) {
      store.dispatch(
        tokenActions.setAccessToken({ accessToken: newAccessToken }),
      ) // 리덕스 accessToken 갱신
    }
    if (newRefreshToken) {
      store.dispatch(
        tokenActions.setRefreshToken({ refreshToken: newRefreshToken }),
      )
    }
    // console.log("response", res)
    return res
  },
  async (error) => {
    console.log("error", error)
    console.log(`errorStatusCode: ${error.response.status}`)

    const state = store.getState() // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken // 리덕스 accessToken 읽기
    const refreshToken = state.token.refreshToken

    const originalConfig = error.config // 기존 요청 정보 저장 (accessToken 요청 후 재발급을 위해)
    const response = error.response // 에러 정보

    if (response.status === 401) {
      // access Token 재발급
      const config: AxiosRequestConfig = {
        method: `post`,
        // baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
        baseURL: "http://70.12.246.176:8200", // 서버 주소
        url: `/api/auth/reissue`,
      } // accessToken 재발급 관련 설정
      if (accessToken) {
        interceptorRequest.defaults.headers.common[`accesstoken`] = accessToken
      }
      if (refreshToken) {
        interceptorRequest.defaults.headers.common[`refreshtoken`] =
          refreshToken
      }
      await interceptorRequest(config)
        .then((res) => {
          console.log("토큰 재발급 응답:")
          console.log(res)
          const newAccessToken =
            res.headers["accesstoken"] || res.data?.accesstoken
          // const newRefreshToken =
          //   res.headers["refreshtoken"] || res.data?.refreshtoken
          if (newAccessToken) {
            store.dispatch(
              tokenActions.setAccessToken({ accessToken: newAccessToken }),
            ) // 리덕스 accessToken 갱신
            // originalConfig.headers.common["accesstoken"] = `${newAccessToken}`
            originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
          }
          // if (newRefreshToken) {
          //   store.dispatch(
          //     tokenActions.setRefreshToken({ refreshToken: newRefreshToken }),
          //   )
          //   originalConfig.headers.common["refreshtoken"] = `${newRefreshToken}`
          // }
          return apiRequest(originalConfig) // 기존 요청 새로운 token으로 재시도
        })
        .catch((err) => {
          console.log("토큰 재발급 에러 : ", err)
          // store.dispatch(DispatchToast("다시 로그인 해주세요.", false))
          return Promise.reject(err)
        })
    } else if (response.status === 403) {
      store.dispatch(
        DispatchToast("토큰이 만료되었습니다. 다시 로그인 해주세요.", false),
      )
      store.dispatch(tokenActions.deleteTokens({}))
    } else if (response.status >= 500) {
      store.dispatch(
        DispatchToast("서버와의 통신에 문제가 발생하였습니다.", false),
      )
    }
    return Promise.reject(error)
  },
)

export default apiRequest
