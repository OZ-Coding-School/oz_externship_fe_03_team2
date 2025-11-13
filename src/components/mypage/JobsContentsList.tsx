import { JobBookmarkCard } from './BookmarkCard'
import { showToast } from '../../utils/showToast'
import { useGetStudyJobBookmarks } from '../../api/services/mypage/studyJobs'

interface JobsContentsListProps {
  searchQuery: string
  debouncedSearchQuery: string
}

function JobsContentsList({
  searchQuery,
  debouncedSearchQuery,
}: JobsContentsListProps) {
  const { data, isLoading } = useGetStudyJobBookmarks()
  const jobs = data?.results || []

  const handleBookmarkToggle = (jobUuid: string) => {
    //api 추가 전
    showToast(`${jobUuid}북마크가 삭제되었습니다`, 'success', '북바크 삭제')
  }

  const handleViewClick = (jobUuid: string) => {
    //api 추가 전
    showToast(`공고 uuid : ${jobUuid}`, 'success', '공고보기 클릭')
  }

  const filterJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <JobBookmarkCard key={index} isLoading />
        ))
      ) : filterJobs.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          {searchQuery ? '검색 결과가 없습니다' : '북마크한 공고가 없습니다'}
        </div>
      ) : (
        filterJobs.map((job) => (
          <JobBookmarkCard
            key={job.uuid}
            data={job}
            onBookmarkToggle={handleBookmarkToggle}
            onViewClick={handleViewClick}
          />
        ))
      )}
    </div>
  )
}

export default JobsContentsList
