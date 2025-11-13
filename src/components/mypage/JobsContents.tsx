import { useState } from 'react'
import { Search } from 'lucide-react'
import useDebounce from '../../hooks/useDebounce'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import JobsContentsList from './JobsContentsList'
import ErrorFallback from '../common/ErrorFallback'

function JobsContents() {
  useDocumentTitle('북마크한 공고')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery)

  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              북마크한 공고
            </h1>
            <p className="text-gray-600">
              나중에 지원할 스터디 공고들을 모아두었습니다
            </p>
          </div>
          {/* 검색창 */}
          <div className="w-80 flex-none">
            <div className="relative">
              <input
                type="text"
                placeholder="공고 제목으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary-600 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-sm focus:outline-none"
              />
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 북마크 리스트 */}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <JobsContentsList
                searchQuery={searchQuery}
                debouncedSearchQuery={debouncedSearchQuery}
              />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  )
}

export default JobsContents
