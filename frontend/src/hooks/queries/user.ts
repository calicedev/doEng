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
  return useQuery("user", function () {
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
      onSuccess: async function () {
        await queryClient.invalidateQueries(`user`)
      },
      onError: function () {},
    },
  )
}

export { useUserQuery, useUserMutation }
