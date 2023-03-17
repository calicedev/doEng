import { useWidthHeight } from "hooks/useWidthHwight"
import React, {
  FC,
  PropsWithChildren,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react"
import StarRating from "../common/StarRating"

interface Review {
  id: number
  memberId: string
  score: number
  content: string
}

interface Props {
  reviewList: Review[]
}

const ReviewList = function ({ reviewList }: PropsWithChildren<Props>) {
  return (
    <div
      className={`overflow-y-auto flex flex-col p-3 rounded-lg bg-white bg-opacity-80 drop-shadow-xl`}
    >
      <div
        className={`overflow-y-auto flex flex-col gap-5 max-h-[400px] sm:h-auto`}
      >
        {reviewList.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default ReviewList

/**/

interface ItemProps {
  review: Review
}

const ReviewItem = function ({ review }: PropsWithChildren<ItemProps>) {
  return (
    <div className={`flex flex-col text-base`}>
      <div className={`flex gap-3 items-center text-lg font-semibold`}>
        {review.memberId}
        <StarRating rating={review.score} />
      </div>
      <p>{review.content}</p>
    </div>
  )
}
