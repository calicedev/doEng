import { useQueryClient, useMutation } from "react-query"
import apiRequest from "utils/axios"
import { AxiosRequestConfig } from "axios"

const useMutationQueryKey = function (queryKey: string | any[]) {
  const queryClient = useQueryClient()
  return useMutation(
    function (request: AxiosRequestConfig) {
      return apiRequest(request)
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries(queryKey)
      },
    },
  )
}

export default useMutationQueryKey
