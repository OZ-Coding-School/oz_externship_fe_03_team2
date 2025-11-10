import useDocumentTitle from '../../hooks/useDocumentTitle'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import CompletedStudyContentsList from './CompletedStudyContentsList'
import ErrorFallback from '../common/ErrorFallback'

function CompletedStudyContents() {
  useDocumentTitle('완료된 스터디')

  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
      <div className="mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            완료된 스터디
          </h1>
          <p className="text-gray-600">
            종료된 스터디 그룹에 대한 리뷰를 작성해보세요
          </p>
        </div>

        {/* 스터디 카드 그리드 + 에러 바운더리*/}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <CompletedStudyContentsList />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  )
}

export default CompletedStudyContents
