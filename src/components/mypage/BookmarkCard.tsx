import Button from '../common/Button'
import Badge from '../common/Badge'
import { User, Calendar, Eye, Bookmark, Clock } from 'lucide-react'

// 공고용 타입
interface JobBookmarkData {
  type: 'job'
  id: number
  title: string
  image: string
  participants: number
  deadline: string
  views: number
  bookmarks: number
  curriculum: string[]
  tags: string[]
}

// 강의용 타입
interface CourseBookmarkData {
  type: 'course'
  id: number
  title: string
  image: string
  instructor: string
  platform: string
  duration: string
  level: string
  price: number
  originalPrice?: number
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
            src={data.image}
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
              모집 인원: {data.participants}명
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              마감일: {data.deadline}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              조회 {data.views}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              북마크 {data.bookmarks}
            </span>
          </div>

          {/* 강의 목록 */}
          <div className="mb-3">
            <p className="mb-2 text-sm font-medium text-gray-700">강의 목록:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              {data.curriculum.map((item, index) => (
                <li key={index}>• {item}</li>
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
            src={data.image}
            alt={data.title}
            className="max-h-24 w-full rounded-lg object-cover"
          />
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-1 flex-col">
          {/* 타이틀 */}
          <div className="mb-2">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {data.title}
            </h3>
            <p className="text-gray-600">{data.instructor}</p>
          </div>

          {/* 플랫폼, 레벨 */}
          <div className="mb-3 flex items-center gap-2">
            <Badge
              variant={data.platform === 'Inflearn' ? 'success' : 'pupple'}
              size="sm"
            >
              {data.platform}
            </Badge>
            <Badge
              variant={
                data.level === '초급'
                  ? 'default'
                  : data.level === '중급'
                    ? 'primary'
                    : 'danger'
              }
              size="sm"
            >
              {data.level}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              {data.duration}
            </span>
          </div>
        </div>

        {/* 가격, 버튼 */}
        <div className="flex flex-shrink-0 flex-col items-end justify-between">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ₩{data.price.toLocaleString()}
            </p>
            {data.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₩{data.originalPrice.toLocaleString()}
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
