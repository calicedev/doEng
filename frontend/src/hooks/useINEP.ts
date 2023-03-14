import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState, useMemo } from "react"
import apiRequest from "utils/axios"

const useINEP = function (
  value: string,
  hookType: string,
  isValid: boolean | null,
) {
  const [dupValid, setDupValid] = useState<boolean | null>(null)
  const {
    typeName,
    requestData,
  }: { typeName: string; requestData: AxiosRequestConfig } = useMemo(
    function () {
      let typeName: string
      let requestData: AxiosRequestConfig
      if (hookType === "email") {
        typeName = "이메일"
        requestData = {
          method: `get`,
          url: `/api/member/check/email/${value}`,
        }
      } else if (hookType === "phone") {
        typeName = "폰 번호"
        requestData = {
          method: `get`,
          url: `/api/member/check/phone/${value}`,
        }
      } else if (hookType === "nick") {
        typeName = "닉네임"
        requestData = {
          method: `get`,
          url: `/api/member/check/nickname/${value}`,
        }
      } else if (hookType === "id") {
        typeName = "아이디"
        requestData = {
          method: `get`,
          url: `/api/member/check/id/${value}`,
        }
      } else {
        typeName = `${value}`
        requestData = {
          method: `get`,
          url: `/api/member/check/${hookType}/${value}`,
        }
      }
      return { typeName, requestData }
    },
    [hookType, value],
  )

  useEffect(
    function () {
      if (!isValid) {
        return
      }
      setDupValid(() => null)
      const axiosSource = axios.CancelToken.source()
      const timeId = setTimeout(function () {
        apiRequest({ ...requestData, cancelToken: axiosSource.token })
          .then((res: AxiosResponse) => {
            setDupValid(() => {
              return res.data === false
            })
          })
          .catch(() => {
            setDupValid(() => false)
          })
      }, 1000)

      return function () {
        axiosSource.cancel()
        clearTimeout(timeId)
      }
    },
    [typeName, requestData, isValid],
  )

  return { dupValid }
}

export default useINEP
