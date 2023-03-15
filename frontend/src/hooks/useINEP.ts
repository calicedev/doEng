import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState, useMemo } from "react"
import { DispatchToast } from "store"
import apiRequest from "utils/axios"
import { useStoreDispatch } from "./useStoreSelector"

const useINEP = function (
  value: string,
  hookType: string,
  isValid: boolean | null,
) {
  const dispatch = useStoreDispatch()
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
          url: `/api/member/check/memberId/${value}`, // member-id로 변경 예정
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
            const val = res.data === false
            setDupValid(() => val)
            if (val) {
              dispatch(DispatchToast(`사용 가능한 ${typeName}입니다!`, true))
            } else {
              dispatch(
                DispatchToast(
                  `${typeName} 형식은 옳지만, 중복된 ${typeName}이 존재합니다!`,
                  false,
                ),
              )
            }
          })
          .catch(() => {
            setDupValid(() => null)
            dispatch(
              DispatchToast(
                `네트워크 에러! ${typeName} 재입력 바랍니다.`,
                false,
              ),
            )
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
