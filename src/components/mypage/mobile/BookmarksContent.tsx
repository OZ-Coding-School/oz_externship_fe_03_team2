import { useState } from 'react'
import { Search } from 'lucide-react'
import useDebounce from '../../../hooks/useDebounce'
import BookmarksStudyListMobile from './BookmarksStudyListMobile'
import BookmarksLectureListMobile from './BookmarksLectureListMobile'
import { useGetStudyJobBookmarks } from '../../../api/services/mypage/studyJobs'
import { useGetLectureBookmarks } from '../../../api/services/mypage/lecture'
import { DropDown } from '../../common/dropDown'

type BookmarkFilter = '전체' | '공고' | '강의'

function BookmarksContent() {
  const [filter, setFilter] = useState<BookmarkFilter>('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery)

  const { data: studyData } = useGetStudyJobBookmarks()
  const { data: lectureData } = useGetLectureBookmarks()

  const studyCount = studyData?.results?.length || 0
  const lectureCount = lectureData?.data?.results?.length || 0
  const totalCount = studyCount + lectureCount

  const filterOptions = [
    { text: `전체 (${totalCount})` },
    { text: `강의 (${lectureCount})` },
    { text: `공고 (${studyCount})` },
  ]

  const handleFilterChange = (value: string) => {
    if (value.startsWith('전체')) setFilter('전체')
    else if (value.startsWith('공고')) setFilter('공고')
    else if (value.startsWith('강의')) setFilter('강의')
  }

  return (
    <>
      {/* 필터, 검색 */}
      <div className="space-y-3 px-4 pb-4">
        {/* 드롭다운 필터 */}
        <DropDown
          placeholder={`전체 (${totalCount})`}
          options={filterOptions}
          onSelect={handleFilterChange}
          size="wFree"
        />

        {/* 검색 */}
        <div className="relative">
          <input
            type="text"
            placeholder="북마크 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:border-primary-500 w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-9 text-sm focus:outline-none"
          />
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="px-4 pb-4">
        {filter === '전체' && (
          <div className="space-y-6">
            {/* 강의 섹션 */}
            {lectureCount > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-gray-700">
                  북마크한 강의
                </h2>
                <BookmarksLectureListMobile
                  searchQuery={debouncedSearchQuery}
                />
              </div>
            )}

            {/* 공고 섹션 */}
            {studyCount > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-gray-700">
                  북마크한 공고
                </h2>
                <BookmarksStudyListMobile searchQuery={debouncedSearchQuery} />
              </div>
            )}

            {studyCount === 0 && lectureCount === 0 && (
              <div className="py-20 text-center text-gray-500">
                북마크한 항목이 없습니다
              </div>
            )}
          </div>
        )}

        {filter === '공고' && (
          <BookmarksStudyListMobile searchQuery={debouncedSearchQuery} />
        )}

        {filter === '강의' && (
          <BookmarksLectureListMobile searchQuery={debouncedSearchQuery} />
        )}
      </div>
    </>
  )
}

export default BookmarksContent
