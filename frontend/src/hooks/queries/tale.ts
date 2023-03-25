import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "utils/axios"
import { queryKeys } from "./queryKeys"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

const useTaleStoreList = function () {
  return useQuery<Tale[]>(
    queryKeys.storeList(),
    function () {
      return apiRequest({
        method: "get",
        url: "/api/mypage/tale-list",
      }).then((res) => res.data.taleList)
    },
    {},
  )
}

export { useTaleStoreList }
