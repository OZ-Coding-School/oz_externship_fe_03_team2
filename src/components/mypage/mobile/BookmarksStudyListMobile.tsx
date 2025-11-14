import { useGetStudyJobBookmarks } from '../../../api/services/mypage/studyJobs'
import BookmarkStudyCardMobile from './BookmarkStudyCardMobile'

interface BookmarksStudyListMobileProps {
  searchQuery: string
}

function BookmarksStudyListMobile({
  searchQuery,
}: BookmarksStudyListMobileProps) {
  const { data, isLoading } = useGetStudyJobBookmarks()
  const jobs = data?.results || []

  // 검색 필터링
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-3">
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <BookmarkStudyCardMobile key={index} isLoading />
        ))
      ) : filteredJobs.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-500">
          {searchQuery ? '검색 결과가 없습니다' : '북마크한 공고가 없습니다'}
        </div>
      ) : (
        filteredJobs.map((job) => (
          <BookmarkStudyCardMobile key={job.uuid} data={job} />
        ))
      )}
    </div>
  )
}

export default BookmarksStudyListMobile
