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
    <div className={`flex flex-col items-center gap-2 min-w-[200px] w-[20%]`}>
      <div
        className={`overflow-hidden relative w-full rounded drop-shadow-md`}
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          src={backgroundImage}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <p className={`font-bold text-xl`}>{title}</p>
      <div className={`flex gap-2 text-xl items-center`}>
        <StarRating rating={score} /> {score}
      </div>
      {purchased ? (
        <MyPageButton disabled={true}>구매완료</MyPageButton>
      ) : (
        <MyPageButton disabled={true}>구매하기</MyPageButton>
      )}
    </div>
  )
}

export default TaleDetailHeader
