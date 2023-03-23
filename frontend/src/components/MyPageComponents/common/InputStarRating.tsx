import React, { FC, PropsWithChildren, MouseEvent, useState, memo } from "react"
import { FaStar } from "react-icons/fa"

/*
1~5점의 별점을 마우스로 클릭하여 입력할 수 있는 컴포넌트
*/

interface Props {
  rating: number
  setRating: Function
  size?: "small" | "medium" | "large" // 별 사이즈 조절
}

const InputStarRating = ({
  rating,
  setRating,
  size = "small",
}: PropsWithChildren<Props>) => {
  const [isClicked, setIsClicked] = useState(false)

  // 마우스가 별 위에 올라왔을 때
  const handleMouseEnter = (index: number) => {
    if (isClicked) return
    setRating(index + 1)
  }

  // 마우스가 별 밖으로 나갔을 때
  const handleMouseLeave = () => {
    if (isClicked) return
    setRating(0)
  }

  // 별을 클릭 했을 때
  const handleStarClick = (index: number) => {
    setRating(index + 1)
    setIsClicked(true)
  }

  // 사이즈 관련 Tailwind Class 할당
  const sizeClass = {
    small: "text-lg gap-1",
    medium: "text-2xl gap-2",
    large: "text-3xl gap-3",
  }[size]

  return (
    <div className={`flex gap-1 ${sizeClass}`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  )
}

interface StarProps {
  filled: boolean
  onClick: (e: MouseEvent<HTMLElement>) => void
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void
}

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<StarProps>) => {
  const colorClass = filled ? "text-yellow-400" : "text-gray-300"

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${colorClass}`}
    >
      <FaStar />
    </div>
  )
}

export default InputStarRating

// const Star = ({ filled, onClick }) => {
//   const fill = filled ? "text-yellow-500" : "text-gray-300"
//   return (
//     <svg
//       className={`h-6 w-6 ${fill} cursor-pointer`}
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       onClick={onClick}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 2L8 8H2l5 5-1 7 6-3 6 3-1-7 5-5h-6l-4-6z"
//       />
//     </svg>
//   )
