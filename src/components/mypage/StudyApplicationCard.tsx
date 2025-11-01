import { birthdayFormat } from '../../utils/dateFormat'
import Badge from '../common/Badge'

interface StudyApplicationData {
  id: number
  title: string
  image: string
  participants: number
  deadline: string
  curriculum: string[]
  tags: string[]
  appliedAt: string
  status: 'pending' | 'success' | 'rejected'
}

interface StudyApplicationCardProps {
  data?: StudyApplicationData
  onClick?: () => void
  isLoading?: boolean
}

export default function StudyApplicationCard({
  data,
  onClick,
  isLoading,
}: StudyApplicationCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex gap-4">
          {/* 이미지 스켈레톤 */}
          <div className="flex h-auto w-40 flex-shrink-0 items-center">
            <div className="h-24 w-full rounded-lg bg-gray-200" />
          </div>

          {/* 컨텐츠 스켈레톤 */}
          <div className="flex flex-1 flex-col">
            {/* 타이틀 + 상태 */}
            <div className="mb-3 flex items-center justify-between">
              <div className="h-7 w-2/3 rounded bg-gray-200" />
              <div className="flex items-end gap-1">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-200" />
              </div>
            </div>

            {/* 모집인원, 마감일 */}
            <div className="mb-3 flex items-center justify-between">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="h-5 w-32 rounded bg-gray-200" />
            </div>

            {/* 강의 목록 */}
            <div className="mb-3">
              <div className="mb-2 h-5 w-20 rounded bg-gray-200" />
              <div className="space-y-1">
                <div className="h-4 w-64 rounded bg-gray-200" />
                <div className="h-4 w-56 rounded bg-gray-200" />
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded bg-gray-200" />
              <div className="h-6 w-24 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return

  const getStatusBadge = () => {
    switch (data.status) {
      case 'pending':
        return { variant: 'primary' as const, text: '대기중' }
      case 'success':
        return { variant: 'success' as const, text: '승인됨' }
      case 'rejected':
        return { variant: 'danger' as const, text: '거절됨' }
      default:
        return { variant: 'primary' as const, text: '대기중' }
    }
  }

  const statusBadge = getStatusBadge()

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex gap-4">
        {/* 이미지 */}
        <div className="flex h-auto w-40 flex-shrink-0 items-center overflow-hidden rounded-lg">
          {data.image ? (
            <img
              src={data.image}
              alt={data.title}
              className="h-24 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
              Image
            </div>
          )}
        </div>
        {/* 컨텐츠 */}
        <div className="flex flex-1 flex-col">
          {/* 타이틀 + 상태 */}
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex-1 text-xl font-bold text-gray-900 hover:underline">
              {data.title}
            </h3>
            <div className="flex items-end gap-1">
              <p className="text-sm text-gray-500">{data.appliedAt}</p>
              <Badge variant={statusBadge.variant} size="sm">
                {statusBadge.text}
              </Badge>
            </div>
          </div>

          {/* 모집인원, 마감일 */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              <span className="mr-1 font-medium">모집 인원:</span>
              {data.participants}명
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">마감일:</span>{' '}
              {birthdayFormat(data.deadline)}
            </p>
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

          {/* 태그뱃지 */}
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <Badge key={index} variant="primary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
