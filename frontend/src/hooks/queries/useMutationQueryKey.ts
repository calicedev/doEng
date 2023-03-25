import { useQueryClient, useMutation } from "@tanstack/react-query"
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
        queryClient.invalidateQueries()
      },
    },
  )
}

export default useMutationQueryKey
