import { Bookmark } from 'lucide-react'
import { useToggleStudyJobBookmark } from '../../../api/services/mypage/studyJobs'
import { showToast } from '../../../utils/showToast'
import type { StudyJobs } from '../../../types/apiInterface/mypageInterface'
import Button from '../../common/Button'

interface BookmarkStudyCardMobileProps {
  data?: StudyJobs
  isLoading?: boolean
}

function BookmarkStudyCardMobile({
  data,
  isLoading,
}: BookmarkStudyCardMobileProps) {
  const { mutate: toggleBookmark } = useToggleStudyJobBookmark()

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (data?.uuid) {
      toggleBookmark(data.uuid, {
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
    if (data?.uuid) {
      const url = `https://learn.ozcoding.site/recruit/${data.uuid}`
      window.open(url, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="max-h-12 max-w-16 shrink-0 rounded bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="h-3 w-1/3 rounded bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-8 w-14 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        {/* 썸네일 */}
        <div className="max-h-12 max-w-16 shrink-0 overflow-hidden rounded bg-gray-100">
          {data.thumbnail_img_url ? (
            <img
              src={data.thumbnail_img_url}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* 콘텐츠들 */}
        <div className="flex flex-1 flex-col">
          {/* 제목 */}
          <h3 className="mb-2 line-clamp-2 text-sm leading-tight font-semibold text-gray-900">
            {data.title}
          </h3>

          {/* 메타 */}
          <p className="mb-3 text-xs text-gray-600">
            모집 {data.expected_headcount}명 · 조회 {data.views_count}
          </p>

          {/* 북마크 + 보기버튼 */}
          <div className="flex items-center gap-2">
            <button onClick={handleBookmarkToggle} className="shrink-0">
              <Bookmark className="fill-primary-500 text-primary-500 h-5 w-5" />
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
  )
}

export default BookmarkStudyCardMobile
