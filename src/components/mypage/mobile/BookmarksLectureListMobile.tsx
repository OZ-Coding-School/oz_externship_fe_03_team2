import { useGetLectureBookmarks } from '../../../api/services/mypage/lecture'
import BookmarkLectureCardMobile from './BookmarkLectureCardMobile'

interface BookmarksLectureListMobileProps {
  searchQuery: string
}

function BookmarksLectureListMobile({
  searchQuery,
}: BookmarksLectureListMobileProps) {
  const { data: response, isLoading } = useGetLectureBookmarks()
  const lectures = response?.data?.results || []

  // 검색 필터링
  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.lecture_info.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lecture.lecture_info.instructor
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-3">
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <BookmarkLectureCardMobile key={index} isLoading />
        ))
      ) : filteredLectures.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-500">
          {searchQuery ? '검색 결과가 없습니다' : '북마크한 강의가 없습니다'}
        </div>
      ) : (
        filteredLectures.map((lecture) => (
          <BookmarkLectureCardMobile key={lecture.id} data={lecture} />
        ))
      )}
    </div>
  )
}

export default BookmarksLectureListMobile
