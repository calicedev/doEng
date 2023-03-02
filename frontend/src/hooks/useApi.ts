import axios from "axios"
import { useState, useCallback } from "react"

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
  saveDataFunction: (data: object) => void
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
    saveDataFunction: (data: object) => void
  ): Promise<void> {
    setIsLoading(() => true)
    setError(() => false)
    await axios(requestData)
      .then((res: object) => {
        saveDataFunction(res)
        return res
      })
      .then((res: object) => {
        setIsLoading(() => false)
        setError(() => false)
      })
      .catch((err: object) => {
        setIsLoading(() => false)
        setError(() => true)
      })
  },
  [])
  return { isLoading, isError, axiosRequest }
}

export default useApi
