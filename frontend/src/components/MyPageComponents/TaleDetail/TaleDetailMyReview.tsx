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
  const [score, setScore] = useState(review ? review.score : 0)
  const [content, setContent] = useState(review ? review.content : "")
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

  // 리뷰 수정하기
  const updateReview = (reviewId: number) => {
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

  // 리뷰 삭제하기
  const deleteReview = (reviewId: number) => {
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

  // 리뷰 수정 취소
  const cancelUpdating = () => {
    setScore(review ? review.score : 0)
    setContent(review ? review.content : "")
    setIsUpdating(false)
  }

  const containerClass = `flex flex-col gap-2`
  const innerClass = `flex justify-between gap-6 text-lg`
  const inputClass = `flex-1 rounded px-3`
  return (
    <>
      {!review ? (
        <div className={`${containerClass}`}>
          <InputStarRating size={`large`} rating={score} setRating={setScore} />
          <div className={`${innerClass}`}>
            <input value={content} type="text" className={`${inputClass}`} />
            <MyPageButton
              text="작성"
              color={`orange`}
              onClick={() => createReview(taleId)}
            />
          </div>
        </div>
      ) : isUpdating ? (
        <div className={`${containerClass}`}>
          <InputStarRating size={`large`} rating={score} setRating={setScore} />
          <div className={`${innerClass}`}>
            <input
              value={content}
              type="text"
              className={`${inputClass}`}
              onChange={(e) => setContent(e.target.value)}
            />
            <MyPageButton text="취소" color={`gray`} onClick={cancelUpdating} />
            <MyPageButton
              text="수정"
              color={`orange`}
              onClick={() => updateReview(review.id)}
            />
          </div>
        </div>
      ) : (
        <div className={`${containerClass}`}>
          <StarRating rating={review.score} size={`large`} />
          <div className={`${innerClass}`}>
            <p className={`flex-1`}>{review.content}</p>
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
              onClick={() => deleteReview(review.id)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MyReview
