import React, { FC, PropsWithChildren, MouseEvent, ReactNode } from "react"
import MyPageButton from "../common/MyPageButton"
import StarRating from "../common/StarRating"

interface Props {
  backgroundImage: string
  title: string
  score: number
  purchased: boolean
}

const TaleDetailHeader: FC<PropsWithChildren<Props>> = function ({
  backgroundImage,
  title,
  score,
  purchased,
}) {
  return (
    <div
      className={`flex flex-col items-center gap-4 min-w-[250px] w-[80%] sm:w-[27%]`}
    >
      <div
        className={`overflow-hidden relative w-[80%] rounded drop-shadow-md`}
        style={{ paddingBottom: "110%" }}
      >
        <img
          src={backgroundImage}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <p className={`font-bold text-2xl text-center`}>{title}</p>
      <div className={`flex gap-2 text-xl items-center`}>
        <StarRating rating={score} size="medium" /> {score}
      </div>
      {purchased ? (
        <MyPageButton disabled={true} text="구매완료" />
      ) : (
        <MyPageButton disabled={true} text="구매하기" />
      )}
    </div>
  )
}

export default TaleDetailHeader
