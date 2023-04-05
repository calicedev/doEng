import IconButton from "components/UI/IconButton"
import React, { useState, FC, PropsWithChildren } from "react"
import StarRating from "../common/StarRating"
import InputStarRating from "../common/InputStarRating"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiRequest from "utils/axios"
import { DispatchToast } from "store"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { Review, useReviewList } from "hooks/queries/queries"
import { queryKeys } from "hooks/queries/queryKeys"
import { AxiosRequestConfig } from "axios"
import { SpinnerDots } from "components/UI/Spinner"

// interface Review {
//   id: number
//   memberId: string
//   score: number
//   content: string
// }

const MyReview = function () {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const queryClient = useQueryClient()
  const { taleId } = useParams() as { taleId: string } // 참조: https://velog.io/@euji42/Typescript-useParams-%ED%83%80%EC%9E%85-oi26j7va
  const { data: review, isLoading } = useReviewList(parseInt(taleId))

  const { mutateAsync: mutateReview } = useMutation({
    mutationFn: function (requestType: string) {
      return apiRequest({
        method: requestType,
        url: `/api/mypage/review/${taleId}`,
        data: {
          score,
          content,
        },
      })
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.store())
    },
  })
  const { mutateAsync: delReview } = useMutation({
    mutationFn: function () {
      return apiRequest({
        method: `delete`,
        url: `/api/mypage/review/${review?.myReview.id}`,
      })
    },
    onSuccess: function () {
      // queryClient.invalidateQueries(queryKeys.store())
      queryClient.invalidateQueries({ queryKey: queryKeys.store() })
    },
  })
  const { mutateAsync: putReview } = useMutation({
    mutationFn: function () {
      return apiRequest({
        method: `put`,
        url: `/api/mypage/review/${review?.myReview.id}`,
        data: {
          score,
          content,
        },
      })
    },
    onSuccess: function () {
      // queryClient.invalidateQueries(queryKeys.store())
      queryClient.invalidateQueries({ queryKey: queryKeys.store() })
    },
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [score, setScore] = useState(
    review?.myReview ? review.myReview.score : 0,
  )
  const [content, setContent] = useState(
    review?.myReview ? review.myReview.content : "",
  )

  const createReview = function () {
    mutateReview("post")
      .then((res) => {
        dispatch(DispatchToast("리뷰 작성 성공!", true))
      })
      .catch((err) => {
        dispatch(DispatchToast("리뷰 작성 실패! 재시도 바랍니다.", false))
      })
  }
  const updateReview = function () {
    putReview()
      .then((res) => {
        setIsUpdating(() => false)
        dispatch(DispatchToast("리뷰 수정 완료!", true))
      })
      .catch((err) => {
        dispatch(DispatchToast("리뷰 수정 실패! 재시도 바랍니다.", false))
      })
  }
  const deleteReview = function () {
    // mutateReview("delete")
    delReview()
      .then((res) => {
        setScore(() => 0)
        setContent(() => "")
        dispatch(DispatchToast("리뷰 삭제 완료!", true))
      })
      .catch((err) => {
        dispatch(DispatchToast("리뷰 삭제 실패! 재시도 바랍니다.", false))
      })
  }

  // 리뷰 수정 취소
  const cancelUpdating = () => {
    setScore(review?.myReview.score ? review.myReview.score : 0)
    setContent(review?.myReview ? review.myReview.content : "")
    setIsUpdating(false)
  }

  const containerClass = `flex flex-col gap-2`
  const innerClass = `flex justify-between gap-6 text-xl`
  const inputClass = `flex-1 rounded px-3`
  if (isLoading) {
    return <SpinnerDots />
  }
  return (
    <>
      {!review?.myReview ? (
        <div className={`${containerClass}`}>
          <InputStarRating size={`large`} rating={score} setRating={setScore} />
          <div className={`${innerClass}`}>
            <input
              value={content}
              type="text"
              className={`${inputClass}`}
              onChange={(e) => setContent(e.target.value)}
            />
            <MyPageButton text="작성" color={`orange`} onClick={createReview} />
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
            <MyPageButton text="수정" color={`orange`} onClick={updateReview} />
          </div>
        </div>
      ) : (
        <div className={`${containerClass}`}>
          <StarRating rating={review?.myReview?.score || 0} size={`large`} />
          <div className={`${innerClass}`}>
            <p className={`flex-1`}>{review?.myReview?.content || ""}</p>
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
              onClick={deleteReview}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MyReview
