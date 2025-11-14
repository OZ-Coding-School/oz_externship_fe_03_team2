import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../common/ErrorFallback'
import BookmarksContent from './BookmarksContent'

function BookmarksContentsMobile() {
  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white">
      {/* 헤더 */}
      <div className="px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900">북마크</h1>
        <p className="mt-1 text-sm text-gray-600">저장한 스터디 공고 및 강의</p>
      </div>

      {/* 모바일 북마크 콘텐츠들 */}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <BookmarksContent />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default BookmarksContentsMobile
