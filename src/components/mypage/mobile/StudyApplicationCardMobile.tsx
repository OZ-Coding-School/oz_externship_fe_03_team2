import type { Application } from '../../../types/apiInterface/mypageInterface'
import { getApplicationStatusBadge } from '../../../utils/applicationBadge'
import { fullDateFormat } from '../../../utils/dateFormat'
import Badge from '../../common/Badge'

interface StudyApplicationCardMobileProps {
  data?: Application
  isLoading?: boolean
  onClick?: () => void
}

function StudyApplicationCardMobile({
  data,
  isLoading,
  onClick,
}: StudyApplicationCardMobileProps) {
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

  if (!data) return

  const statusBadge = getApplicationStatusBadge(data.status)

  return (
    <div
      onClick={onClick}
      className="min-h-29.5 cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex gap-3">
        {/* 이미지 */}
        <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
          {data.recruitment_img ? (
            <img
              src={data.recruitment_img}
              alt={data.recruitment_title}
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
              {data.recruitment_title}
            </h3>
            <Badge variant={statusBadge.variant} size="sm">
              {statusBadge.text}
            </Badge>
          </div>

          {/* 정보 */}
          <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
            <span>모집 {data.expected_headcount}명</span>
            <span>{fullDateFormat(data.created_at)}</span>
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
