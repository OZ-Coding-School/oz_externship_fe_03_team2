import StarRating from '../common/StarRating'

export interface PopularCoursesCardrops {
  title: string
  description: string
  date: string
  imageUrl: string
  instructor?: string
  original_price?: number
  discount_price?: number
  average_rating?: number
  size?: string
  onClick?: () => void
}

export default function PopularCoursesCard({
  title,
  description,
  date,
  imageUrl,
  instructor,
  original_price,
  discount_price,
  average_rating,
  onClick,
  size = 'w-[389.33px] h-[387.88px]',
}: PopularCoursesCardrops) {
  return (
    <div
      className={`${size} relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 select-none hover:-translate-y-[.3rem] hover:shadow-[0_0_.9375rem_#00000020]`}
      onClick={onClick}
    >
      <div className="h-[217.86px] w-full">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>

      <div className="absolute bottom-0 flex w-full flex-col gap-2 rounded-b-lg border-t-2 border-gray-200 bg-white p-4">
        <p className="text-[1.125rem] font-bold">{title}</p>
        {instructor && <p className="text-sm text-gray-600">{instructor}</p>}
        <p className="[word-break:keep-all] text-gray-700">{description}</p>

        {average_rating !== undefined && (
          <div className="mt-1">
            <StarRating rating={average_rating} size="sm" />
          </div>
        )}

        {(original_price !== undefined || discount_price !== undefined) && (
          <div className="mt-2 flex items-center justify-between">
            {original_price && original_price > 0 && (
              <p className="text-sm text-gray-400 line-through">
                ₩{original_price.toLocaleString()}
              </p>
            )}
            {discount_price && discount_price > 0 ? (
              <p className="text-primary-500 text-lg font-semibold">
                ₩{discount_price.toLocaleString()}
              </p>
            ) : discount_price === 0 ? (
              <p className="text-primary-500 text-lg font-semibold">무료</p>
            ) : null}
          </div>
        )}

        <p className="mt-1 text-[0.75rem] font-light text-gray-500">{date}</p>
      </div>
    </div>
  )
}
