import IconButton from "components/UI/IconButton"
import React, { useState, FC, PropsWithChildren } from "react"
import StarRating from "../common/StarRating"
import InputStarRating from "../common/InputStarRating"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs"
import axios from "utils/axios"
import { useParams } from "react-router-dom"
import useApi from "hooks/useApi"

interface Review {
  id: number
  memberId: string
  score: number
  content: string
}

interface Props {
  review: {
    id: number
    memberId: string
    score: number
    content: string
  } | null
  getReviews: () => void
}

const MyReview = function ({ review, getReviews }: PropsWithChildren<Props>) {
  const { taleId } = useParams() as { taleId: string } // 참조: https://velog.io/@euji42/Typescript-useParams-%ED%83%80%EC%9E%85-oi26j7va

  const [isUpdating, setIsUpdating] = useState(false)
  const [score, setScore] = useState(0)
  const [content, setContent] = useState("")
  const { isLoading, isError, axiosRequest } = useApi()

  // 리뷰 작성하기
  const createReview = (taleId: string) => {
    const data = {
      score,
      content,
    }
    axiosRequest(
      {
        method: "post",
        url: `/api/mypage/review/${taleId}`,
        data,
      },
      (res) => {
        getReviews()
      },
      "리뷰 작성에 실패했습니다.",
    )
  }

  const updateReview = (reviewId: number, taleId: string) => {
    const data = {
      score,
      content,
    }
    axiosRequest(
      {
        method: "put",
        url: `/api/mypage/review/${reviewId}`,
        data,
      },
      (res) => {
        getReviews()
      },
      "리뷰 수정에 실패했습니다.",
    )
  }

  const deleteReview = (reviewId: number, taleId: string) => {
    axiosRequest(
      {
        method: "delete",
        url: `/api/mypage/review/${reviewId}`,
      },
      (res) => {
        getReviews()
      },
      "리뷰 삭제에 실패했습니다.",
    )
  }

  return (
    <>
      {!review ? (
        <div>
          <InputStarRating />
          <div className="flex justify-between gap-5">
            <input type="text" className={`flex-1 rounded`} />
            <MyPageButton color={`orange`} onClick={() => createReview(taleId)}>
              작성
            </MyPageButton>
          </div>
        </div>
      ) : isUpdating ? (
        <div>
          <InputStarRating />
          <div className="flex justify-between gap-5">
            <input type="text" className={`flex-1 rounded`} />
            <MyPageButton color={`gray`} onClick={() => setIsUpdating(false)}>
              취소
            </MyPageButton>
            <MyPageButton
              color={`orange`}
              onClick={() => updateReview(review.id, taleId)}
            >
              수정
            </MyPageButton>
          </div>
        </div>
      ) : (
        <div>
          <StarRating rating={review.score} size={`medium`} />
          <div className="flex justify-between">
            <p>{review.content}</p>
            <div className="flex gap-4">
              <IconButton
                icon={<BsFillPencilFill />}
                size={`small`}
                onClick={() => {
                  setIsUpdating(true)
                }}
              />
              <IconButton
                icon={<BsFillTrash3Fill />}
                size={`small`}
                onClick={() => deleteReview(review.id, taleId)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MyReview
