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
  size = 'w-[389.33px]',
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
      className={`${size} flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 select-none hover:-translate-y-[.3rem] hover:shadow-[0_0_.9375rem_#00000020]`}
      onClick={onClick}
    >
      <div className="h-[217.86px] w-full flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={thumbnail_img_url}
          alt={title}
        />
      </div>

      {/* 제목 길어지면 ... 처리 */}
      <div className="flex min-h-[170px] flex-col gap-2 border-t border-gray-200 bg-white p-4">
        <h3 className="truncate text-[18px] font-semibold text-gray-900">
          {title}
        </h3>

        {instructor && (
          <p className="truncate text-[14px] text-gray-500">{instructor}</p>
        )}

        {average_rating !== undefined && (
          <div className="flex items-center gap-1">
            <StarRating rating={average_rating} size="sm" />
          </div>
        )}

        {/* 가격 */}
        {(original_price !== undefined || discount_price !== undefined) && (
          <div className="mt-auto flex items-center gap-2 pt-2">
            {discount_price &&
              discount_price > 0 &&
              discount_price !== original_price && (
                <p className="text-[18px] font-bold text-gray-900">
                  {discount_price.toLocaleString()}원
                </p>
              )}

            {original_price && original_price > 0 && (
              <p
                className={`${
                  discount_price &&
                  discount_price > 0 &&
                  discount_price !== original_price
                    ? 'text-[14px] text-gray-500 line-through'
                    : 'text-[18px] font-bold text-gray-900'
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
