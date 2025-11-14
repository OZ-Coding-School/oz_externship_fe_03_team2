import Button from '../../common/Button'
import { Bookmark } from 'lucide-react'
import { useRemoveLectureBookmark } from '../../../api/services/mypage/lecture'
import { showToast } from '../../../utils/showToast'
import type { LectureBookmark } from '../../../types/apiInterface/mypageInterface'
import {
  firstUppercaseFormat,
  getDifficultyLabel,
} from '../../../utils/badgeFormat'

interface BookmarkLectureCardMobileProps {
  data?: LectureBookmark
  isLoading?: boolean
}

function BookmarkLectureCardMobile({
  data,
  isLoading,
}: BookmarkLectureCardMobileProps) {
  const { mutate: removeBookmark } = useRemoveLectureBookmark()

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (data?.lecture_info.uuid) {
      removeBookmark(data.lecture_info.uuid, {
        onSuccess: () => {
          showToast('북마크가 삭제되었습니다', 'success', '북마크 삭제')
        },
        onError: () => {
          showToast('북마크 삭제 실패', 'error', '오류 발생')
        },
      })
    }
  }

  const handleCardClick = () => {
    if (data?.lecture_info.url_link) {
      window.open(data.lecture_info.url_link, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="max-h-12 max-w-16 shrink-0 rounded bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-5 w-14 rounded bg-gray-200" />
              <div className="h-5 w-10 rounded bg-gray-200" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 rounded bg-gray-200" />
              <div className="h-8 w-12 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return

  const isFreePrice =
    data.lecture_info.original_price === 0 &&
    data.lecture_info.discount_price === 0

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        {/* 썸네일 */}
        <div className="max-h-12 max-w-16 shrink-0 overflow-hidden rounded bg-gray-100">
          {data.lecture_info.thumbnail_img_url ? (
            <img
              src={data.lecture_info.thumbnail_img_url}
              alt={data.lecture_info.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* 콘텐츠들 */}
        <div className="flex flex-1 flex-col gap-2">
          {/* 제목 */}
          <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-gray-900">
            {data.lecture_info.title}
          </h3>

          {/* 강사명 */}
          <p className="text-xs text-gray-600">
            {data.lecture_info.instructor}
          </p>

          {/* 플랫폼 + 레벨 배지 */}
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
              {firstUppercaseFormat(data.lecture_info.platform)}
            </span>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              {getDifficultyLabel(data.lecture_info.difficulty)}
            </span>
          </div>

          {/* 가격 + 버튼 */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {isFreePrice ? (
                <span className="font-bold text-gray-900">무료</span>
              ) : (
                <>
                  <span className="font-bold text-gray-900">
                    ₩{data.lecture_info.discount_price.toLocaleString()}
                  </span>
                  {data.lecture_info.original_price > 0 &&
                    data.lecture_info.original_price !==
                      data.lecture_info.discount_price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₩{data.lecture_info.original_price.toLocaleString()}
                      </span>
                    )}
                </>
              )}
            </div>

            {/* 북마크 + 보기 버튼 */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBookmarkToggle}
                className="shrink-0 cursor-pointer"
              >
                <Bookmark className="fill-primary-500 text-primary-500 hover:fill-primary-600 hover:text-primary-600 h-5 w-5" />
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick()
                }}
              >
                보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkLectureCardMobile
