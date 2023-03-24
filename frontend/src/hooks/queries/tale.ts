import { useQuery, useMutation, useQueryClient } from "react-query"
import apiRequest from "utils/axios"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

const useTaleStoreList = function () {
  return useQuery<Tale[]>(
    `taleStoreList`,
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
