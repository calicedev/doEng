import axios from "axios"
import { useState, useCallback } from "react"
import apiRequest from "../utils/axios"

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
  requestData: object,
  saveDataFunction: (data: object) => void,
) => Promise<void>

interface useApiHook {
  (): {
    isLoading: boolean
    isError: boolean
    axiosRequest: axiosFunc
  }
}

const useApi: useApiHook = function () {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)

  const axiosRequest: axiosFunc = useCallback(async function (
    requestData: object,
    saveDataFunction: (data: object) => void,
  ): Promise<void> {
    setIsLoading(() => true)
    setError(() => false)
    await apiRequest(requestData)
      .then((res: object) => {
        saveDataFunction(res)
        return res
      })
      .then((res: object) => {
        setIsLoading(() => false)
        setError(() => false)
      })
      .catch((err: object) => {
        console.log(err) // 추후 삭제해야함!
        setIsLoading(() => false)
        setError(() => true)
        setTimeout(function () {
          setError(() => false)
        }, 3000)
      })
  },
  [])
  return { isLoading, isError, axiosRequest }
}

export default useApi
