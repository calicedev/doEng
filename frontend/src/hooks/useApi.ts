import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios"
import { useState, useCallback, useEffect } from "react"
import { DispatchToast } from "store"
import apiRequest from "../utils/axios"
import { useStoreDispatch } from "./useStoreSelector"

// requestData = {
//   method: requestData.method,
//   url: requestData.url,
//   // transformRequest: ,
//   // transformResponse: ,
//   headers: requestData.headers,
//   data: requestData.data,
//   timeout: requestData.timeout,
//   withCredentials: requestData.withCredentials,
// }

type axiosFunc = (
  requestData: AxiosRequestConfig,
  saveDataFunction: (data: AxiosResponse) => void,
  failMessage?: string,
) => Promise<void>

interface useApiHook {
  (): {
    isLoading: boolean
    isError: boolean
    btnClasses: string
    axiosRequest: axiosFunc
  }
}

const useApi: useApiHook = function () {
  const dispatch = useStoreDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const [btnClasses, setBtnClasses] = useState<string>(
    "bg-yellow-200 border-[2.8px] border-yellow-400 text-yellow-900",
  )

  useEffect(
    function () {
      if (isError) {
        setBtnClasses(() => "bg-red-200 border-red-400 text-red-900")
      } else {
        setBtnClasses(() => "bg-yellow-200 border-yellow-400 text-yellow-900")
      }
    },
    [isError],
  )

  const axiosRequest: axiosFunc = useCallback(
    async function (
      requestData,
      saveDataFunction,
      failMessage = "알 수 없는 에러!",
    ): Promise<void> {
      setIsLoading(() => true)
      setError(() => false)
      await apiRequest(requestData)
        .then((res: AxiosResponse) => {
          saveDataFunction(res)
          return res
        })
        .then((res: AxiosResponse) => {
          setIsLoading(() => false)
          setError(() => false)
        })
        .catch((err: AxiosError) => {
          setIsLoading(() => false)
          setError(() => true)
          if (
            !err.response?.status ||
            err.response?.status === 403 ||
            err.response?.status >= 500
          ) {
            return
          }
          dispatch(DispatchToast(failMessage, false))
          setTimeout(function () {
            setError(() => false)
          }, 3000)
        })
    },
    [dispatch],
  )
  return { isLoading, isError, btnClasses, axiosRequest }
}

export default useApi
