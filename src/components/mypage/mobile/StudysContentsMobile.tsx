import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import StudyApplicationsListMobile from './StudyApplicationsListMobile'
import ErrorFallback from '../../common/ErrorFallback'

function StudysContentsMobile() {
  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white">
      {/* 헤더 */}
      <div className="px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900">지원 내역</h1>
        <p className="mt-1 text-sm text-gray-600">
          내가 지원한 스터디 구인 공고들을 확인하세요
        </p>
      </div>

      {/* 지원 내역 리스트 */}
      <div className="p-4">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <StudyApplicationsListMobile />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  )
}

export default StudysContentsMobile
