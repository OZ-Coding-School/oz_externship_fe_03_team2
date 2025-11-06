import { CourseBookmarkCard } from './BookmarkCard'
import {
  useGetLectureBookmarks,
  useRemoveLectureBookmark,
} from '../../api/services/mypage/profile'
import { showToast } from '../../utils/showToast'

interface CourseBookmarkListProps {
  searchQuery: string
  debouncedSearchQuery: string
}

function CourseContentsList({
  searchQuery,
  debouncedSearchQuery,
}: CourseBookmarkListProps) {
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
    if (courseUrl) window.open(courseUrl, '_blank')
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
    <div className="space-y-4">
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <CourseBookmarkCard key={index} isLoading />
        ))
      ) : filterCourses.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          {searchQuery ? '검색 결과가 없습니다' : '북마크한 강의가 없습니다'}
        </div>
      ) : (
        filterCourses.map((course) => (
          <CourseBookmarkCard
            key={course.id}
            data={course}
            onBookmarkToggle={handleBookmarkToggle}
            onViewClick={() => handleViewClick(course.lecture_info.url_link)}
          />
        ))
      )}
    </div>
  )
}

export default CourseContentsList
