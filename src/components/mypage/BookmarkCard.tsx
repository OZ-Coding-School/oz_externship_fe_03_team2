import Button from '../common/Button'
import Badge from '../common/Badge'
import { User, Calendar, Eye, Bookmark, Clock } from 'lucide-react'
import type {
  LectureBookmark,
  StudyJobs,
} from '../../types/apiInterface/mypageInterface'

interface JobBookmarkCardProps {
  data?: StudyJobs
  onBookmarkToggle?: (id: number) => void
  onViewClick?: (id: number) => void
  isLoading?: boolean
}

interface CourseBookmarkCardProps {
  data?: LectureBookmark
  onBookmarkToggle?: (id: number) => void
  onViewClick?: (id: number) => void
  isLoading?: boolean
}

// 공고 카드
export function JobBookmarkCard({
  data,
  onBookmarkToggle,
  onViewClick,
  isLoading,
}: JobBookmarkCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex gap-4">
          {/*이미지 스켈레톤 */}
          <div className="flex h-auto min-w-40 items-center rounded-lg">
            <div className="h-24 w-full rounded-lg bg-gray-200" />
          </div>

          {/* 컨텐츠 스켈레톤 */}
          <div className="flex flex-1 flex-col">
            {/* 타이틀 */}
            <div className="mb-2">
              <div className="h-6 w-3/4 rounded bg-gray-200" />
            </div>

            {/* 메타 정보 */}
            <div className="mb-3 flex gap-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>

            {/* 강의 목록 */}
            <div className="mb-3 space-y-2">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-200" />
              <div className="h-4 w-44 rounded bg-gray-200" />
            </div>

            {/* 태그 */}
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded bg-gray-200" />
              <div className="h-6 w-24 rounded bg-gray-200" />
            </div>
          </div>

          {/* 버튼 스켈레톤 - 실제와 동일한 구조 */}
          <div className="flex flex-shrink-0 flex-col items-start gap-2">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-10 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="flex h-auto min-w-40 items-center rounded-lg">
          {data.thumbnail ? (
            <img
              src={data.thumbnail}
              alt={data.title}
              className="h-24 w-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-full items-center justify-center bg-gray-200 text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-1 flex-col">
          {/* 타이틀 */}
          <div className="mb-2 flex items-start justify-between">
            <h3 className="flex-1 pr-4 text-lg font-semibold text-gray-900">
              {data.title}
            </h3>
          </div>

          {/* 메타 정보 */}
          <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              모집 인원: {data.max_headcount}명
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              마감일: {data.end_at}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              조회 {data.views}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              북마크 {data.bookmark_count}
            </span>
          </div>

          {/* 강의 목록 */}
          <div className="mb-3">
            <p className="mb-2 text-sm font-medium text-gray-700">강의 목록:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              {data.courses.map((course, index) => (
                <li key={index}>
                  • {course.name} - {course.instructor}
                </li>
              ))}
            </ul>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <Badge key={index} variant="primary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 공고 보기 버튼 */}
        <div className="flex flex-shrink-0 flex-col items-start gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onBookmarkToggle?.(data.id)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <Bookmark className="fill-primary-500 text-primary-500 h-5 w-5" />
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onViewClick?.(data.id)}
            >
              공고 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 강의 카드
export function CourseBookmarkCard({
  data,
  onBookmarkToggle,
  onViewClick,
  isLoading,
}: CourseBookmarkCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex gap-4">
          {/*이미지 스켈레톤 */}
          <div className="flex h-auto min-w-40 items-center rounded-lg">
            <div className="h-24 w-full rounded-lg bg-gray-200" />
          </div>

          {/* 컨텐츠 스켈레톤 */}
          <div className="flex flex-1 flex-col">
            {/* 타이틀 */}
            <div className="mb-2">
              <div className="mb-1 h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
            </div>

            {/* 플랫폼, 레벨 */}
            <div className="mb-3 flex gap-2">
              <div className="h-6 w-20 rounded bg-gray-200" />
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
          </div>

          {/* 가격, 버튼 스켈레톤 */}
          <div className="flex flex-shrink-0 flex-col items-end justify-between">
            <div className="space-y-1 text-right">
              <div className="h-7 w-24 rounded bg-gray-200" />
              <div className="h-5 w-20 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-10 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="flex h-auto min-w-40 items-center rounded-lg">
          {data.lecture_info.thumbnail_img_url ? (
            <img
              src={data.lecture_info.thumbnail_img_url}
              alt={data.lecture_info.title}
              className="max-h-24 w-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-full items-center justify-center bg-gray-200 text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-1 flex-col">
          {/* 타이틀 */}
          <div className="mb-2">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {data.lecture_info.title}
            </h3>
            <p className="text-gray-600">{data.lecture_info.instructor}</p>
          </div>

          {/* 플랫폼, 레벨 */}
          <div className="mb-3 flex items-center gap-2">
            <Badge
              variant={
                data.lecture_info.platform === 'Inflearn' ? 'success' : 'pupple'
              }
              size="sm"
            >
              {data.lecture_info.platform}
            </Badge>
            <Badge
              variant={
                data.lecture_info.difficulty === 'EASY'
                  ? 'success'
                  : data.lecture_info.difficulty === 'NORMAL'
                    ? 'primary'
                    : 'danger'
              }
              size="sm"
            >
              {data.lecture_info.difficulty === 'EASY'
                ? '초급'
                : data.lecture_info.difficulty === 'NORMAL'
                  ? '중급'
                  : '고급'}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              {data.lecture_info.duration}
            </span>
          </div>
        </div>

        {/* 가격, 버튼 */}
        <div className="flex flex-shrink-0 flex-col items-end justify-between">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ₩{data.lecture_info.discount_price.toLocaleString()}
            </p>
            {data.lecture_info.original_price && (
              <p className="text-sm text-gray-500 line-through">
                ₩{data.lecture_info.original_price.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onBookmarkToggle?.(data.id)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <Bookmark className="fill-primary-500 text-primary-500 h-5 w-5" />
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onViewClick?.(data.id)}
            >
              강의 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
