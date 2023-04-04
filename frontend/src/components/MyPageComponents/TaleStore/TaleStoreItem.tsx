import React, { FC, PropsWithChildren } from "react"
import checkImg from "assets/images/checkPurchased.png"
import StarRating from "../common/StarRating"
import { useNavigate } from "react-router-dom"
import { StoreTale } from "hooks/queries/queries"

interface Props {
  tale: StoreTale
}

const TaleStoreItem = function ({ tale }: PropsWithChildren<Props>) {
  const navigate = useNavigate()

  const toTaleDetail = () => {
    navigate(`/mypage/talestore/${tale.id}`)
  }

  return (
    <div
      onClick={toTaleDetail}
      className={`flex flex-col items-center gap-2 relative p-3 min-w-[180px] cursor-pointer ease-in-out duration-300 hover:scale-110`}
    >
      {tale.purchased && (
        <img
          src={checkImg}
          alt={`purchased`}
          className={`absolute z-10 top-0 left-0 w-10 h-auto drop-shadow`}
        />
      )}
      <div
        className={`overflow-hidden relative z-0 w-full pb-[133%] rounded bg-white drop-shadow-lg`}
      >
        <img
          src={tale.backgroundImage}
          alt={tale.title}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <StarRating rating={tale.score} size="medium" />
    </div>
  )
}

export default TaleStoreItem
