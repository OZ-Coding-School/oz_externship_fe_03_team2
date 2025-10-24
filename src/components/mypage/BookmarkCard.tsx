import Button from '../common/Button'
import Badge from '../common/Badge'
import { User, Calendar, Eye, Bookmark, Clock } from 'lucide-react'

// 강의 정보 타입
interface LectureInfo {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  platform: string
  description: string
  difficulty: 'BEGINNER' | 'NORMAL' | 'ADVANCED'
  duration: string
  original_price: number
  discount_price: number
  average_rating: number
  url_link: string
}

// 공고 > 강의 타입
interface Course {
  name: string
  instructor: string
}

// 공고용 타입
interface JobBookmarkData {
  type: 'job'
  id: number
  uuid: string
  title: string
  introduction: string
  thumbnail: string
  max_headcount: number
  start_at: string
  end_at: string
  status: 'PENDING' | 'ACTIVE' | 'CLOSED'
  courses: Course[]
  tags: string[]
  views: number
  bookmark_count: number
  bookmarked_at: string
}

// 강의용 타입
interface CourseBookmarkData {
  type: 'course'
  id: number
  lecture_info: LectureInfo
  created_at: string
}

type BookmarkData = JobBookmarkData | CourseBookmarkData

interface BookmarkCardProps {
  data: BookmarkData
  onBookmarkToggle: (id: number) => void
  onViewClick?: (id: number) => void
}

// 공고 카드
function JobBookmarkCard({
  data,
  onBookmarkToggle,
  onViewClick,
}: {
  data: JobBookmarkData
  onBookmarkToggle: (id: number) => void
  onViewClick?: (id: number) => void
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="flex h-auto max-w-36 flex-shrink-0 items-center">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="max-h-24 w-full rounded-lg object-cover"
          />
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
              onClick={() => onBookmarkToggle(data.id)}
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
function CourseBookmarkCard({
  data,
  onBookmarkToggle,
  onViewClick,
}: {
  data: CourseBookmarkData
  onBookmarkToggle: (id: number) => void
  onViewClick?: (id: number) => void
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="flex h-auto w-40 flex-shrink-0 items-center">
          <img
            src={data.lecture_info.thumbnail_img_url}
            alt={data.lecture_info.title}
            className="max-h-24 w-full rounded-lg object-cover"
          />
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
                data.lecture_info.difficulty === 'BEGINNER'
                  ? 'default'
                  : data.lecture_info.difficulty === 'NORMAL'
                    ? 'primary'
                    : 'danger'
              }
              size="sm"
            >
              {data.lecture_info.difficulty === 'BEGINNER'
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
              onClick={() => onBookmarkToggle(data.id)}
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

// 메인 북마크 카드 컴포넌트 (타입별로 분기)
export default function BookmarkCard({
  data,
  onBookmarkToggle,
  onViewClick,
}: BookmarkCardProps) {
  if (data.type === 'job') {
    return (
      <JobBookmarkCard
        data={data}
        onBookmarkToggle={onBookmarkToggle}
        onViewClick={onViewClick}
      />
    )
  }

  return (
    <CourseBookmarkCard
      data={data}
      onBookmarkToggle={onBookmarkToggle}
      onViewClick={onViewClick}
    />
  )
}
