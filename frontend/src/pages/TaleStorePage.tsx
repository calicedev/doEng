import React, { useState, useEffect } from "react"
import axios from "utils/axios"
import TaleStoreItem from "components/MyPageComponents/TaleStore/TaleStoreItem"
import useApi from "hooks/useApi"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

const TaleStorePage = function () {
  const [taleList, setTaleList] = useState<Tale[]>(exData.taleList)
  const { isLoading, isError, axiosRequest } = useApi()

  // 마운트 시 책 리스트 정보 받아오기
  useEffect(() => {
    axiosRequest(
      {
        method: "get",
        url: "/api/mypage/tale-list",
      },
      (res) => {
        setTaleList(res.data)
      },
      "책 정보를 불러오지 못했습니다",
    )
  }, [])

  return (
    <>
      {isLoading ? (
        <div>로딩 중</div>
      ) : (
        <div className="overflow-y-auto mx-2 my-3 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {taleList.map((tale: Tale) => (
              <TaleStoreItem key={tale.id} tale={tale} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default TaleStorePage

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
  ],
}
