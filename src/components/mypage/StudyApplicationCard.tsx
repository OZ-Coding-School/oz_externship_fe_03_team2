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
  status: 'pending' | 'accepted' | 'rejected'
}

interface StudyApplicationCardProps {
  data: StudyApplicationData
}

export default function StudyApplicationCard({
  data,
}: StudyApplicationCardProps) {
  const getStatusBadge = () => {
    switch (data.status) {
      case 'pending':
        return { variant: 'default' as const, text: '대기중' }
      case 'accepted':
        return { variant: 'success' as const, text: '승인됨' }
      case 'rejected':
        return { variant: 'danger' as const, text: '거절됨' }
    }
  }

  const statusBadge = getStatusBadge()

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
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
            <h3 className="flex-1 text-xl font-bold text-gray-900">
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
              <span className="font-medium">마감일:</span> {data.deadline}
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
