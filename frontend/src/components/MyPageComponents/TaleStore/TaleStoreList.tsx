import React, { useState, useEffect } from "react"
import TaleStoreItem from "components/MyPageComponents/TaleStore/TaleStoreItem"
import useApi from "hooks/useApi"
import { useUserQuery } from "hooks/queries/user"
import apiRequest from "utils/axios"
import { useQuery } from "react-query"
import { DispatchToast } from "store"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}
////////////////////////////////////////////////////////////////
// react query 사용해보기
const TaleStoreList = function () {
  const {
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
  } = useUserQuery()
  console.log(queryLoading, queryError)
  console.log(queryData)
  // const a = useQuery("user", function () {
  //   return apiRequest({
  //     method: `get`,
  //     url: `/api/member`,
  //   }).then((res) => res.data)
  // }, {onSuccess: function(data) {
  //   dispatch(DispatchToast("asdfasdf", true)),
  // }, onError: function(err) {}})

  // apiRequest({ method: `get`, url: `/api/member` })
  //   .then((res) => console.log("성공임"))
  //   .catch(() => console.log("에러임"))

  const [taleList, setTaleList] = useState<Tale[]>(exData.taleList)
  const { isLoading, isError, axiosRequest } = useApi()
  // 마운트 시 책 리스트 정보 받아오기
  // useEffect(() => {
  //   axiosRequest(
  //     {
  //       method: "get",
  //       url: "/api/mypage/tale-list",
  //     },
  //     (res) => {
  //       setTaleList(res.data)
  //     },
  //     "책 정보를 불러오지 못했습니다",
  //   )
  // }, [axiosRequest])

  return (
    <>
      {isLoading ? (
        <div>로딩 중</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {taleList.map((tale: Tale) => (
            <TaleStoreItem key={`tale-${tale.id}`} tale={tale} />
          ))}
        </div>
      )}
    </>
  )
}

export default TaleStoreList

const exData = {
  taleList: [
    {
      id: 1,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 2,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 3,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 4,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 5,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 6,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
    {
      id: 7,
      title: "백설공주",
      backgroundImage: "http://image.yes24.com/goods/62494205/XL",
      score: 3.8,
      purchased: true,
    },
    {
      id: 8,
      title: "신데렐라",
      backgroundImage:
        "https://cdn.imweb.me/upload/S20210128257d7c0c29db4/ba5c87dbaa546.png",
      score: 4.5,
      purchased: false,
    },
  ],
}
