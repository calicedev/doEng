import React, { PropsWithChildren } from "react"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

interface Props {
  rating: number // 0~5 사이의 소수
  size?: "small" | "medium" | "large"
}

const StarRating = ({ rating, size = "small" }: PropsWithChildren<Props>) => {
  // 사이즈 관련 Tailwind Class 할당
  const sizeClass = {
    small: "text-lg gap-1",
    medium: "text-2xl gap-2",
    large: "text-3xl gap-3",
  }[size]

  // rating에 따라 표시 별점 채우기
  const starComponents = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starComponents.push(<FaStar key={i} />)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      starComponents.push(<FaStarHalfAlt key={i} />)
    } else {
      starComponents.push(<FaRegStar key={i} />)
    }
  }

  return (
    <div className={`flex text-yellow-400 ${sizeClass}`}>{starComponents}</div>
  )
}

export default StarRating
