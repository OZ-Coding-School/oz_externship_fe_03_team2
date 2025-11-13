import Modal from '../common/Modal'
import Button from '../common/Button'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../common/ErrorFallback'
import StudyDetailModalContent from './StudyDetailModalContent'
import EmptyData from '../common/EmptyData'

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
          <Button variant="danger" size="md" onClick={onClose}>
            × 지원 취소
          </Button>
        </>
      }
    >
      {isOpen && applicationUuid ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <StudyDetailModalContent applicationUuid={applicationUuid} />
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
