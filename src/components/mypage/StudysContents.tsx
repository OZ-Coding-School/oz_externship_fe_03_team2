import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import StudyApplicationsList from './StudyApplicationsList'
import ErrorFallback from '../common/ErrorFallback'

function StudysContents() {
  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">지원 내역</h1>
          <p className="text-gray-600">
            내가 지원한 스터디 구인 공고들을 확인하세요
          </p>
        </div>

        {/* 지원 내역 리스트 */}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <StudyApplicationsList />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  )
}

export default StudysContents
