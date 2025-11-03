import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import useDebounce from '../../hooks/useDebounce'
import { birthdayFormat } from '../../utils/dateFormat'
import { JobBookmarkCard } from './BookmarkCard'
import { showToast } from '../../utils/showToast'
import type { StudyJobs } from '../../types/apiInterface/mypageInterface'
import useDocumentTitle from '../../hooks/useDocumentTitle'

function JobsContents() {
  useDocumentTitle('북마크한 공고')
  const [jobs, setJobs] = useState<StudyJobs[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        // 더미 데이터
        const mockData: StudyJobs[] = [
          {
            id: 101,
            uuid: 'uuid-0001',
            title: 'Vue.js 프론트엔드 개발팀 모집',
            introduction: 'Vue.js로 프로젝트를 함께 진행할 팀원을 모집합니다.',
            thumbnail: '',
            max_headcount: 4,
            start_at: '2025-11-01T10:00:00Z',
            end_at: birthdayFormat('2025-12-15T18:00:00Z'),
            status: 'PENDING',
            courses: [
              { name: 'Vue.js 완벽 가이드', instructor: '정복' },
              { name: 'Nuxt.js 실전', instructor: '김패스트' },
            ],
            tags: ['Vue.js', '프론트엔드', '팀프로젝트'],
            views: 245,
            bookmark_count: 38,
            bookmarked_at: '2025-10-16T14:00:00Z',
          },
          {
            id: 102,
            uuid: 'uuid-0002',
            title: '딥러닝 AI 프로젝트 스터디팀 모집',
            introduction:
              '딥러닝과 AI 기술을 함께 학습하고 프로젝트를 진행할 스터디원을 모집합니다.',
            thumbnail:
              'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            max_headcount: 3,
            start_at: '2025-11-10T10:00:00Z',
            end_at: birthdayFormat('2025-12-12T18:00:00Z'),
            status: 'ONGOING',
            courses: [
              { name: '딥러닝 완벽 마스터', instructor: '김딥러닝' },
              { name: 'TensorFlow 실전', instructor: '박텐서플로' },
            ],
            tags: ['딥러닝', 'AI', '머신러닝'],
            views: 289,
            bookmark_count: 62,
            bookmarked_at: '2025-10-17T09:30:00Z',
          },
          {
            id: 103,
            uuid: 'uuid-0003',
            title: 'Unity 게임 개발 프로젝트팀 멤버 모집',
            introduction:
              'Unity를 활용한 3D 게임 개발 프로젝트 팀원을 모집합니다.',
            thumbnail:
              'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            max_headcount: 6,
            start_at: '2025-11-15T10:00:00Z',
            end_at: birthdayFormat('2026-02-28T18:00:00Z'),
            status: 'PENDING',
            courses: [
              { name: 'Unity 게임 개발 마스터', instructor: '박유니티' },
              { name: 'C# 게임 프로그래밍', instructor: '김씨샵' },
            ],
            tags: ['Unity', 'C#', '게임개발', '3D개발'],
            views: 412,
            bookmark_count: 105,
            bookmarked_at: '2025-10-18T11:20:00Z',
          },
        ]
        setJobs(mockData)
      } catch {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleBookmarkToggle = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId))
    showToast('북마크가 삭제되었습니다', 'success', '북바크 삭제')
  }

  const handleViewClick = (jobId: number) => {
    showToast(`공고 id : ${jobId}`, 'success', '공고보기 클릭')
  }

  const filterJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  )

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
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <JobBookmarkCard key={index} isLoading />
            ))
          ) : filterJobs.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              {searchQuery
                ? '검색 결과가 없습니다'
                : '북마크한 공고가 없습니다'}
            </div>
          ) : (
            filterJobs.map((job) => (
              <JobBookmarkCard
                key={job.id}
                data={job}
                onBookmarkToggle={handleBookmarkToggle}
                onViewClick={handleViewClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default JobsContents
