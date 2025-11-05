import Badge from '../../common/Badge'

interface StudyApplication {
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

interface StudyApplicationProps {
  data?: StudyApplication
  isLoading?: boolean
  onClick?: () => void
}

function StudyApplicationCardMobile({
  data,
  isLoading,
  onClick,
}: StudyApplicationProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200" />
          <div className="flex-1">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
            <div className="flex gap-1">
              <div className="h-5 w-12 rounded bg-gray-200" />
              <div className="h-5 w-12 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

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
      className="min-h-29.5 cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex gap-3">
        {/* 이미지 */}
        <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
          {data.image ? (
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-hidden">
          {/* 제목과 상태 */}
          <div className="mb-5 flex items-start justify-between gap-2">
            <h3 className="flex-1 truncate text-sm font-semibold text-gray-900">
              {data.title}
            </h3>
            <Badge variant={statusBadge.variant} size="sm">
              {statusBadge.text}
            </Badge>
          </div>

          {/* 정보 */}
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
            <span>모집 {data.participants}명</span>
            <span className="text-gray-300">|</span>
            <span>{data.appliedAt}</span>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1">
            {data.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="primary" size="sm">
                {tag}
              </Badge>
            ))}
            {data.tags.length > 3 && (
              <Badge variant="default" size="sm">
                +{data.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyApplicationCardMobile
