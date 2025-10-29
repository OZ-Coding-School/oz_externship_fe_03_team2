import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { fullDateFormat } from '../../utils/dateFormat'
import { getStatusBadge } from '../../utils/statusBadge'
import { Loading } from '../common/Loading'
import type { DetailApplicationResponse } from '../../types/apiInterface/mypageInterface'

interface StudyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  applicationId: number | null
}

function StudyDetailModal({
  isOpen,
  onClose,
  applicationId,
}: StudyDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [applicationDetail, setApplicationDetail] =
    useState<DetailApplicationResponse | null>(null)
  // 모달이 열릴때 api호출할 예정
  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplicationDetail(applicationId)
    }

    // 모달이 닫힐 때 데이터 초기화
    if (!isOpen) {
      setApplicationDetail(null)
    }
  }, [isOpen, applicationId])

  const fetchApplicationDetail = async (_id: number) => {
    setIsLoading(true)
    try {
      // 더미데이터
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockData: DetailApplicationResponse = {
        id: 101,
        status: 'APPLIED',
        created_at: '2025-10-16T02:10:00Z',
        self_introduction:
          '3년차 프론트엔드 개발자로 일하고 있습니다. React를 주로 사용하며 최근 DevOps에 관심이 생겨서 이 스터디에 지원하게 되었습니다.',
        motivation:
          'DevOps 문화를 이해하고 실제 인프라로 구축해보고 싶어서 지원하였습니다. 현재 회사에서도 CI/CD 파이프라인 구축을 담당하게 될 예정이어서 실무에 바로 적용할 수 있을 것 같습니다.',
        objective:
          '3개월 후에는 AWS 기반의 완전한 CI/CD 파이프라인을 구축할 수 있는 능력을 갖추고 싶습니다.',
        available_time: '평일 저녁 7-9시, 주말 오후 시간대 참여 가능합니다.',
        has_study_experience: true,
        study_experience:
          '작년에 React 스터디를 6개월간 진행했으며, 스터디 결과물로 쇼핑몰 웹사이트를 완성했습니다. 스터디 결과물은 포트폴리오 사이트에 올려놓았습니다.',
        recruitment: {
          id: 12,
          title: '프론트엔드 DevOps 스터디',
          thumbnail:
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
          expected_headcount: 6,
          deadline: '2025-10-31',
        },
      }
      setApplicationDetail(mockData)
    } catch {
      setApplicationDetail(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="지원 상세 정보"
      subtitle={applicationDetail?.recruitment.title || ''}
      isOpen={isOpen}
      onClose={onClose}
      width="w-full max-w-[672px]"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose}>
            닫기
          </Button>
          <Button variant="danger" size="md" onClick={onClose}>
            × 지원 취소
          </Button>
        </>
      }
    >
      {isLoading ? (
        <Loading />
      ) : applicationDetail ? (
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
            <p className="mb-2 text-sm font-medium text-gray-700">
              스터디 목표
            </p>
            <p className="eading-relaxed rounded-lg bg-gray-50 p-4 text-gray-700">
              {applicationDetail.objective}
            </p>
          </div>

          {/* 가능한 시간대 */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              가능한 시간대
            </p>
            <p className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">
              {applicationDetail.available_time}
            </p>
          </div>

          {/* 스터디 경험 */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              스터디 경험
            </p>
            <div className="p-4">
              <Badge
                variant={
                  applicationDetail.study_experience ? 'success' : 'danger'
                }
                size="sm"
              >
                {applicationDetail.study_experience ? '경험 있음' : '경험 없음'}
              </Badge>
              {applicationDetail.study_experience && (
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {applicationDetail.study_experience}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          데이터를 불러올 수 없습니다.
        </div>
      )}
    </Modal>
  )
}

export default StudyDetailModal
