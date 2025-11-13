import Badge from '../common/Badge'
import { fullDateFormat } from '../../utils/dateFormat'
import { getStatusBadge } from '../../utils/statusBadge'
import { Loading } from '../common/Loading'
import { useGetApplicationDetail } from '../../api/services/mypage/studyApplication'

interface StudyDetailModalContentProps {
  applicationUuid: string
}

function StudyDetailModalContent({
  applicationUuid,
}: StudyDetailModalContentProps) {
  const { data, isLoading } = useGetApplicationDetail(applicationUuid, true)

  const applicationDetail = data?.data

  if (isLoading) return <Loading />

  if (!applicationDetail) {
    return (
      <div className="py-8 text-center text-gray-500">
        데이터를 불러올 수 없습니다.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 지원 상태 & 지원 일시 */}
      <div className="flex items-start justify-between rounded-lg bg-gray-50 p-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">지원 상태</p>
          <Badge
            variant={getStatusBadge(applicationDetail.status).variant}
            size="sm"
          >
            {getStatusBadge(applicationDetail.status).text}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-right text-sm text-gray-600">지원 일시</p>
          <p className="text-right text-sm font-medium text-gray-900">
            {fullDateFormat(applicationDetail.created_at)}
          </p>
        </div>
      </div>

      {/* 자기소개 */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">자기소개</p>
        <p className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">
          {applicationDetail.self_introduction}
        </p>
      </div>

      {/* 지원 동기 */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">지원 동기</p>
        <p className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">
          {applicationDetail.motivation}
        </p>
      </div>

      {/* 스터디 목표 */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">스터디 목표</p>
        <p className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">
          {applicationDetail.objective}
        </p>
      </div>

      {/* 가능한 시간대 */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">가능한 시간대</p>
        <p className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">
          {applicationDetail.available_time}
        </p>
      </div>

      {/* 스터디 경험 */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">스터디 경험</p>
        <div className="rounded-lg bg-gray-50 p-4">
          <Badge
            variant={
              applicationDetail.has_study_experience ? 'success' : 'danger'
            }
            size="sm"
          >
            {applicationDetail.has_study_experience ? '경험 있음' : '경험 없음'}
          </Badge>
          {applicationDetail.has_study_experience &&
            applicationDetail.study_experience && (
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {applicationDetail.study_experience}
              </p>
            )}
        </div>
      </div>
    </div>
  )
}

export default StudyDetailModalContent
