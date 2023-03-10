import React, { useState, useEffect } from 'react'
import axios from 'utils/axios'
import TaleStoreItem from 'components/MyPageComponents/TaleStore/TaleStoreItem'

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

export default function TaleStorePage() {
  const [taleList, setTaleList] = useState(exData.taleList)

  // 마운트 시 책 리스트 정보 받아오기
  useEffect(() => {
    axios({ url: '/api/mypage/tale-list', method: 'get' })
      .then((res) => {
        setTaleList(res.data.taleList)
      })
      .catch((err) => {
        alert(err.response.msg)
      })
  }, [])

  return (
    <div className="grid grid-cols-5 gap-4">
      {taleList.map((tale: Tale) => (
        <TaleStoreItem key={tale.id} tale={tale} />
      ))}
    </div>
  )
}

const exData = {
  taleList: [
    {
      id: 1,
      title: '백설공주',
      backgroundImage:
        'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788965671527.jpg',
      score: 3.8,
      purchased: true,
    },
    {
      id: 2,
      title: '신데렐라',
      backgroundImage:
        'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788969524850.jpg',
      score: 4.5,
      purchased: false,
    },
  ],
}
