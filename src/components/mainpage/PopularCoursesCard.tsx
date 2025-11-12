import StarRating from '../common/StarRating'
import type { Lecture } from '../../types/apiInterface/mainpageInterface'

export interface PopularCoursesCardProps {
  course: Lecture
  onClick?: () => void
  size?: string
}

export default function PopularCoursesCard({
  course,
  onClick,
  size = 'w-[389.33px] h-[387.88px]',
}: PopularCoursesCardProps) {
  const {
    title,
    instructor,
    original_price,
    discount_price,
    average_rating,
    thumbnail_img_url,
  } = course

  return (
    <div
      className={`${size} relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 select-none hover:-translate-y-[.3rem] hover:shadow-[0_0_.9375rem_#00000020]`}
      onClick={onClick}
    >
      <div className="h-[217.86px] w-full">
        <img
          className="h-full w-full object-cover"
          src={thumbnail_img_url}
          alt={title}
        />
      </div>

      <div className="absolute bottom-0 flex w-full flex-col gap-2 rounded-b-2xl border-t border-gray-200 bg-white p-4">
        <p className="line-clamp-2 text-[18px] leading-snug font-semibold text-[#111827]">
          {title}
        </p>

        {instructor && (
          <p className="text-[14px] font-normal text-[#6B7280]">{instructor}</p>
        )}

        {average_rating !== undefined && (
          <div className="mt-1 flex items-center gap-1">
            <StarRating rating={average_rating} size="sm" />
            <span className="text-[14px] font-normal text-[#6B7280]"></span>
          </div>
        )}

        {(original_price !== undefined || discount_price !== undefined) && (
          <div className="mt-2 flex items-center gap-2">
            {discount_price &&
              discount_price > 0 &&
              discount_price !== original_price && (
                <p className="text-[18px] font-bold text-[#111827]">
                  {discount_price.toLocaleString()}원
                </p>
              )}

            {original_price && original_price > 0 && (
              <p
                className={`${
                  discount_price &&
                  discount_price > 0 &&
                  discount_price !== original_price
                    ? 'text-[14px] text-[#6B7280] line-through'
                    : 'text-[18px] font-bold text-[#111827]'
                }`}
              >
                {original_price.toLocaleString()}원
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
