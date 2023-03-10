import React, { FC, PropsWithChildren, MouseEvent, useState } from "react"
import { FaStar } from "react-icons/fa"

const InputStarRating = () => {
  const [rating, setRating] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  const handleMouseEnter = (index: number) => {
    if (isClicked) return
    setRating(index + 1)
  }

  const handleMouseLeave = () => {
    if (isClicked) return
    setRating(0)
  }

  const handleStarClick = (index: number) => {
    setRating(index + 1)
    setIsClicked(true)
  }

  return (
    <div className="flex gap-1">
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

const Star: React.FC<StarProps> = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
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
