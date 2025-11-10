import { useEffect, useState } from 'react'
import CompletedStudyCard from './CompletedStudyCard'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import type {
  StudyGroups,
  StudyGroupsResponse,
} from '../../types/apiInterface/mypageInterface'

function CompletedStudyContents() {
  useDocumentTitle('완료된 스터디')
  const [studyGroups, setStudyGroups] = useState<StudyGroups[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCompletedStudies = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        // 더미 데이터
        const mockData: StudyGroupsResponse = {
          count: 3,
          next: null,
          previous: null,
          results: [
            {
              uuid: '42cb53a6-f194-4f29-9367-b60f31016fcc',
              name: '두번째실험용1108',
              profile_img_url:
                'https://cdn.inflearn.com/wp-content/uploads/TypeScript_inflearn.png',
              max_headcount: 3,
              start_at: '2025-11-08T18:19:02.543000+09:00',
              end_at: '2025-11-20T18:19:02.543000+09:00',
              status: 'PENDING',
              current_headcount: 0,
              is_leader: false,
              lectures: [
                {
                  uuid: '289eea34-554c-441c-81bc-238c9aa66723',
                  title: '타입스크립트 코리아 : 기초 세미나',
                  instructor: '이웅재',
                  original_price: 0,
                  discount_price: 0,
                },
              ],
              total_pages: 1,
              total_groups: 2,
            },
            {
              uuid: '3996af11-900c-4843-9c53-f4ff562c9aee',
              name: '실험용 스터디그룹 생성',
              profile_img_url:
                'https://cdn.inflearn.com/wp-content/uploads/TypeScript_inflearn.png',
              max_headcount: 2,
              start_at: '2025-11-06T16:48:43.672000+09:00',
              end_at: '2025-12-06T16:48:43.672000+09:00',
              status: 'PENDING',
              current_headcount: 0,
              is_leader: true,
              lectures: [
                {
                  uuid: '289eea34-554c-441c-81bc-238c9aa66723',
                  title: '타입스크립트 코리아 : 기초 세미나',
                  instructor: '이웅재',
                  original_price: 0,
                  discount_price: 0,
                },
              ],
              total_pages: 1,
              total_groups: 2,
            },
          ],
        }
        setStudyGroups(mockData.results)
      } catch {
        setIsLoading(false) //일단 넣을게 없어서 넣음
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompletedStudies()
  }, [])

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

        {/* 스터디 카드 그리드 */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <CompletedStudyCard key={index} isLoading />
            ))}
          </div>
        ) : studyGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {studyGroups.map((study) => (
              <CompletedStudyCard key={study.uuid} study={study} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500">완료된 스터디가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompletedStudyContents
