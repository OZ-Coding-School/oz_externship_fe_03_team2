import { useState } from 'react'
import { Search } from 'lucide-react'
import useDebounce from '../../hooks/useDebounce'
import { CourseBookmarkCard } from './BookmarkCard'
import { showToast } from '../../utils/showToast'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import {
  useGetLectureBookmarks,
  useRemoveLectureBookmark,
} from '../../api/services/mypage/profile'

function CourseContents() {
  useDocumentTitle('북마크한 강의')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery)

  // api 호출
  const { data: response, isLoading } = useGetLectureBookmarks()
  const courses = response?.data.results || []

  const { mutate: removeBookmark } = useRemoveLectureBookmark()

  const handleBookmarkToggle = (lectureUuid: string) => {
    removeBookmark(lectureUuid, {
      onSuccess: () => {
        showToast('북마크가 삭제되었습니다', 'success', '북마크 삭제')
      },
      onError: () => {
        showToast('북마크 삭제 실패', 'error', '오류 발생')
      },
    })
  }

  const handleViewClick = (courseUrl: string) => {
    if (courseUrl) window.open(courseUrl, '_blank') // 새탭에서 열기
  }

  const filterCourses = courses.filter(
    (course) =>
      course.lecture_info.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      course.lecture_info.instructor
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              북마크한 강의
            </h1>
            <p className="text-gray-600">
              나중에 수강할 강의들을 모아두었습니다
            </p>
          </div>
          {/* 검색창 */}
          <div className="w-80 flex-none">
            <div className="relative">
              <input
                type="text"
                placeholder="강의명이나 강사명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary-600 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-sm focus:outline-none"
              />
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 북마크 리스트 */}
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <CourseBookmarkCard key={index} isLoading />
            ))
          ) : filterCourses.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              {searchQuery
                ? '검색 결과가 없습니다'
                : '북마크한 강의가 없습니다'}
            </div>
          ) : (
            filterCourses.map((course) => (
              <CourseBookmarkCard
                key={course.id}
                data={course}
                onBookmarkToggle={handleBookmarkToggle}
                onViewClick={() =>
                  handleViewClick(course.lecture_info.url_link)
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseContents
