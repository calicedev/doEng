import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

interface StarRatingProps {
  rating: number // 0~5 사이의 소수
  size?: String // 사이즈
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'small' }) => {
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

  let sizeClass = ''

  switch (size) {
    case 'small':
      sizeClass = 'text-base'
      break
    case 'medium':
      sizeClass = 'text-lg'
      break
    case 'large':
      sizeClass = 'text-xl'
      break
  }

  return (
    <div className={`flex gap-1 ${sizeClass} text-yellow-400`}>
      {starComponents}
    </div>
  )
}

export default StarRating
