import React, { FC, PropsWithChildren } from "react"
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

const ReviewList: FC<PropsWithChildren<Props>> = function ({ reviewList }) {
  return (
    <div className={`overflow-y-auto flex flex-col gap-5 p-3 rounded bg-white`}>
      {reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

interface ItemProps {
  review: Review
}

const ReviewItem: FC<PropsWithChildren<ItemProps>> = function ({ review }) {
  return (
    <div className={`flex flex-col`}>
      <div className={`flex gap-3 items-center`}>
        {review.memberId}
        <StarRating rating={review.score} />
      </div>
      <p>{review.content}</p>
    </div>
  )
}

export default ReviewList
