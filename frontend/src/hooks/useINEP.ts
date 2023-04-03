import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState, useMemo } from "react"
import { DispatchToast } from "store"
import apiRequest from "utils/axios"
import { useUserData } from "./queries/queries"
import { useStoreDispatch } from "./useStoreSelector"

const useINEP = function (
  value: string,
  hookType: string,
  isValid: boolean | null,
) {
  const dispatch = useStoreDispatch()
  const [dupValid, setDupValid] = useState<boolean | null>(null)
  const { data: userData } = useUserData()
  const {
    typeName,
    requestData,
    oldData,
  }: { typeName: string; requestData: AxiosRequestConfig; oldData: string } =
    useMemo(
      function () {
        let typeName: string
        let requestData: AxiosRequestConfig
        let oldData: string

        if (hookType === "email") {
          typeName = "이메일"
          requestData = {
            method: `get`,
            url: `/api/auth/check/email/${value}`,
          }
          oldData = userData?.email || ""
        } else if (hookType === "phone") {
          typeName = "폰 번호"
          requestData = {
            method: `get`,
            url: `/api/auth/check/phone/${value}`,
          }
          oldData = userData?.phone || ""
        } else if (hookType === "nick") {
          typeName = "닉네임"
          requestData = {
            method: `get`,
            url: `/api/auth/check/nickname/${value}`,
          }
          oldData = userData?.nickname || ""
        } else if (hookType === "id") {
          typeName = "아이디"
          requestData = {
            method: `get`,
            url: `/api/auth/check/memberId/${value}`, // auth-id로 변경 예정
          }
          oldData = userData?.memberId || ""
        } else {
          typeName = `${value}`
          requestData = {
            method: `get`,
            url: `/api/auth/check/${hookType}/${value}`,
          }
          oldData = ""
        }
        return { typeName, requestData, oldData }
      },
      [hookType, value],
    )

  useEffect(
    function () {
      if (!isValid || value === oldData) {
        dispatch(DispatchToast(`invalid에 걸림`, false))
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
              dispatch(
                DispatchToast(
                  `${value}는 사용 가능한 ${typeName}입니다!`,
                  true,
                ),
              )
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
    [typeName, requestData, isValid, value],
  )

  return { dupValid }
}

export default useINEP
