import React, { FC, PropsWithChildren } from "react"
import checkImg from "assets/images/checkPurchased.png"
import StarRating from "../common/StarRating"
import { useNavigate } from "react-router-dom"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

interface Props {
  tale: Tale
}

const TaleStoreItem: FC<PropsWithChildren<Props>> = function ({ tale }) {
  const navigate = useNavigate()

  const toTaleDetail = () => {
    navigate(`/mypage/talestore/${tale.id}`)
  }

  return (
    <div
      onClick={toTaleDetail}
      className={`flex flex-col items-center gap-2 relative p-3 cursor-pointer`}
    >
      {tale.purchased && (
        <img
          src={checkImg}
          alt={`purchased`}
          className={`absolute z-10 top-0 left-0 w-10 h-auto drop-shadow`}
        />
      )}
      <div
        className={`overflow-hidden relative z-0 w-full rounded drop-shadow-md`}
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          src={tale.backgroundImage}
          alt={tale.title}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <StarRating rating={tale.score} />
    </div>
  )
}

export default TaleStoreItem
