import { AxiosRequestConfig } from "axios"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { DispatchToast } from "store"
import apiRequest from "utils/axios"

const useGetUserData = function (
  successMessage: string = "요청 성공",
  failMessage: string = "요청 실패",
) {
  const dispatch = useStoreDispatch()
  const queryClient = useQueryClient()
  return useQuery(
    "user",
    async function () {
      return await apiRequest({
        method: `get`,
        url: `/api/member`,
      }).then((res) => res.data)
    },
    {
      onSuccess: function (data) {
        dispatch(DispatchToast(successMessage, true))
      },
      onError: function (err) {
        dispatch(DispatchToast(failMessage, false))
      },
    },
  )
}

const usePostUserData = function (
  successMessage: string = "요청 성공",
  failMessage: string = "요청 실패",
) {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    function (request: AxiosRequestConfig) {
      return apiRequest(request)
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries("user")
        dispatch(DispatchToast(successMessage, true))
        navigate(`/`)
      },
      onError: function () {
        dispatch(DispatchToast(failMessage, false))
      },
    },
  )
}

const usePutUserData = function () {
  const queryClient = useQueryClient()
  return useMutation(
    function (request: AxiosRequestConfig) {
      return apiRequest(request)
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries("user")
      },
    },
  )
}

const useLogin = function (
  successMessage: string = "로그인 성공!",
  failMessage: string = "로그인 실패!",
) {
  const dispatch = useStoreDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    function (request: AxiosRequestConfig) {
      return apiRequest(request)
    },
    {
      onSuccess: function () {
        dispatch(DispatchToast(successMessage, true))
      },
      onError: function () {
        dispatch(DispatchToast(failMessage, false))
      },
    },
  )
}

export { useGetUserData, usePostUserData, useLogin, usePutUserData }
