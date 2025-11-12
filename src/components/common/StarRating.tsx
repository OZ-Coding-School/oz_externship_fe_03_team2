import { Star, StarHalf } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const sizeClass = sizeClasses[size]

  // 정수면 소수점 없이, 소수면 소수점 1자리까지 표시
  const displayRating = rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1)

  return (
    <div className="flex items-center gap-1">
      {/* 채워진 별 */}
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={`full-${index}`}
          className={`text-primary-500 ${sizeClass}`}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
      {/* 반개(0.5) 별 */}
      {hasHalfStar && (
        <StarHalf
          className={`text-primary-500 ${sizeClass}`}
          fill="currentColor"
          strokeWidth={0}
        />
      )}
      {/* 빈 별 */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={`empty-${index}`}
          className={`text-gray-300 ${sizeClass}`}
          fill="none"
          strokeWidth={2}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">
        {displayRating}/5
      </span>
    </div>
  )
}
