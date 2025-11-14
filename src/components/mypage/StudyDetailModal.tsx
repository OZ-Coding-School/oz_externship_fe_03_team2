import Modal from '../common/Modal'
import Button from '../common/Button'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../common/ErrorFallback'
import StudyDetailModalContent from './StudyDetailModalContent'
import EmptyData from '../common/EmptyData'
import {
  useCancelApplication,
  useGetApplicationDetail,
} from '../../api/services/mypage/studyApplication'
import { showToast } from '../../utils/showToast'
import { X } from 'lucide-react'

interface StudyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  applicationUuid: string | null
}

function StudyDetailModal({
  isOpen,
  onClose,
  applicationUuid,
}: StudyDetailModalProps) {
  const { data: applicationDetail, isLoading } = useGetApplicationDetail(
    applicationUuid ?? '',
    isOpen && !!applicationUuid
  )

  // 지원 취소 api 훅
  const { mutate: cancelApplication, isPending } = useCancelApplication(
    applicationUuid ?? ''
  )

  const isCancel = applicationDetail?.data?.status === 'PENDING' // 취소는 (대기 상태일 때만 가능

  const handleCancelClick = () => {
    cancelApplication(undefined, {
      onSuccess: () => {
        onClose()
        showToast('지원이 취소되었습니다', 'error', '지원 취소 성공')
      },
      onError: () => {
        showToast('오류가 발생했습니다', 'error', '지원 취소 실패')
      },
    })
  }

  return (
    <Modal
      title="지원 상세 정보"
      isOpen={isOpen}
      onClose={onClose}
      width="w-full max-w-[672px]"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose}>
            닫기
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleCancelClick}
            disabled={!isCancel || isPending}
            icon={<X size={16} />}
          >
            {isPending ? '취소 중...' : '지원 취소'}
          </Button>
        </>
      }
    >
      {isOpen && applicationUuid ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <StudyDetailModalContent
                applicationDetail={applicationDetail?.data ?? null}
                isLoading={isLoading}
              />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        <EmptyData description="지원서 정보를 찾을 수 없습니다" />
      )}
    </Modal>
  )
}

export default StudyDetailModal
