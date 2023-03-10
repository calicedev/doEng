import axios, { AxiosInstance } from 'axios'
import store from 'store/index'
import { tokenActions } from 'store/tokenSlice'

/*
서버에 요청을 날리는 axios instance
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
*/

const apiRequest: AxiosInstance = axios.create({
  baseURL: 'https://localhost:8080', // 서버 주소
  withCredentials: true, // 쿠키 사용을 위해 설정
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    const state = store.getState() // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken // 리덕스 accessToken 읽기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // 리덕스에 accessToken이 있을 경우 Authorization 헤더 추가
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    console.log('response', response)
    return response
  },
  async (error) => {
    console.log('error', error)

    const originalConfig = error.config // 기존 요청 정보 저장 (accessToken 요청 후 재발급을 위해)
    const response = error.response // 에러 정보

    if (response.status === 401) {
      // access Token 재발급
      const config = {} // accessToken 재발급 관련 설정
      await axios
        .request(config)
        .then((res) => {
          const newAccessToken = res.data.accessToken
          store.dispatch(tokenActions.setAccessToken(newAccessToken)) // 리덕스 accessToken 갱신
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
          return apiRequest(originalConfig) // 기존 요청 새로운 token으로 재시도
        })
        .catch((err) => {
          alert('다시 로그인 해주세요.')
        })
    } else if (response.status === 403) {
      alert('다시 로그인 해주세요.')
    } else if (response.status >= 500) {
      alert('서버와의 통신에 문제가 발생하였습니다.')
    }

    return Promise.reject(error)
  },
)

export default apiRequest
