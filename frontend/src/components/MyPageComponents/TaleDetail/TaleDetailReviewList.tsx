import { SpinnerDots } from "components/UI/Spinner"
import { Review, useReviewList } from "hooks/queries/queries"
import { useWidthHeight } from "hooks/useWidthHwight"
import React, {
  FC,
  PropsWithChildren,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react"
import { useParams } from "react-router-dom"
import StarRating from "../common/StarRating"
import AnimationBox from "components/UI/AnimationBox"

const ReviewList = function () {
  const { taleId } = useParams() as { taleId: string }
  const { data: reviews, isLoading } = useReviewList(parseInt(taleId))

  if (isLoading) {
    return <SpinnerDots />
  }
  if (!reviews) {
    return (
      <div
        className={`overflow-scroll flex flex-col p-3 rounded-lg bg-white bg-opacity-80 drop-shadow-xl font-hopang-black text-[2rem] items-center justify-center`}
      >
        알 수 없는 에러가 발생했습니다. 새로고침 해주세요.
      </div>
    )
  }

  if (reviews?.reviewList.length === 0) {
    return (
      <div
        className={`overflow-y-auto flex flex-col p-3 rounded-lg bg-white bg-opacity-80 drop-shadow-xl font-hopang-black text-[2rem] items-center justify-center`}
      >
        리뷰가 없습니다!
      </div>
    )
  }
  return (
    <div
      className={`flex flex-col overflow-y-auto p-3 rounded-lg bg-white bg-opacity-80 drop-shadow-xl font-hopang-black text-[2rem]`}
    >
      <AnimationBox appearClassName="overflow-auto animate-appear-from-bottom-fast">
        <div className={` flex flex-col gap-5 max-h-[400px] sm:h-auto`}>
          {reviews.reviewList ? (
            reviews.reviewList.map((review) => (
              <ReviewItem key={`review-${review.id}`} review={review} />
            ))
          ) : (
            <div
              className={`flex flex-col overflow-y-auto p-3 rounded-lg bg-white bg-opacity-80 drop-shadow-xl`}
            >
              리뷰가 없습니다!
            </div>
          )}
        </div>
      </AnimationBox>
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
        {review.nickname}
        <StarRating rating={review.score} />
      </div>
      <p>{review.content}</p>
    </div>
  )
}
