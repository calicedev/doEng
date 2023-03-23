import { AxiosRequestConfig } from "axios"
import { useStoreDispatch } from "hooks/useStoreSelector"
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "react-query"
import { useNavigate } from "react-router-dom"
import { DispatchToast } from "store"
import apiRequest from "utils/axios"

interface userData {
  id: number
  memberId: string
  email: string
  nickname: string
  name: string
  phone: string
  createdAt: string
}

type userQuery = {
  (
    method: string,
    successMessage?: string,
    failMessage?: string,
  ): UseQueryResult
}
type userMutation = {
  (
    method: string,
    successMessage?: string,
    failMessage?: string,
  ): UseMutationResult
}

// userdata를 사용하는 unique Key
const useUserQuery = function () {
  return useQuery<userData>("user", function () {
    return apiRequest({
      method: `get`,
      url: `/api/member`,
    }).then((res) => res.data)
  })
}

// 기본 mutate 선언. 필요 시 useMutation 직접 선언해서 쓰면 된다.
const useUserMutation = function () {
  const queryClient = useQueryClient()
  return useMutation(
    function (request: AxiosRequestConfig) {
      return apiRequest(request)
    },
    {
      onSuccess: function (data) {
        console.log(data)
        queryClient.invalidateQueries(`user`)
      },
      onError: function (err) {
        console.log(err)
      },
    },
  )
}

export { useUserQuery, useUserMutation }
