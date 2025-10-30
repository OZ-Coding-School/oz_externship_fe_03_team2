import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingInputProps {
  rating: number
  onRatingChange: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

function StarRatingInput({
  rating,
  onRatingChange,
  size = 'md',
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0) //호버중인 별
  const sizeClass = sizeClasses[size]

  return (
    <div className="flex gap-2">
      {/*별 5개 생성 (1점~~5점) */}
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)} // 클릭시 해당 점수 전달
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)} // 마우스 나가면 호버 초기화
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Star
            className={`${sizeClass} ${
              star <= (hoverRating || rating)
                ? 'text-primary-500'
                : 'text-gray-300'
            }`}
            fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'} // fill 속성 currentColor는 위에서 설정한 color 값을 따라감
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  )
}

export default StarRatingInput
