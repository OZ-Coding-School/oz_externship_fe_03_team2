import { useEffect, useState } from 'react'
import CompletedStudyCard, { type StudyGroup } from './CompletedStudyCard'
import { Loading } from '../common/Loading'

interface completedResponse {
  status: number
  message: string
  data: {
    study_groups: StudyGroup[]
  }
}

function CompletedStudyContents() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCompletedStudies = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        // 더미 데이터
        const mockData: completedResponse = {
          status: 200,
          message: '스터디 그룹 목록 조회에 성공했습니다.',
          data: {
            study_groups: [
              {
                id: 1,
                name: 'Vue.js 마스터 스터디',
                current_headcount: 8,
                max_headcount: 10,
                is_leader: false,
                profile_img_url:
                  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
                start_at: '2023-11-01',
                end_at: '2024-02-01',
                status: 'completed',
                lectures: [
                  {
                    id: 1,
                    title: 'Vue.js 기초',
                    instructor: '김강사',
                  },
                ],
                review_count: 3,
                star_rating_average: 0,
                is_reviewed: false,
              },
              {
                id: 2,
                name: 'Python 데이터 분석 스터디',
                current_headcount: 6,
                max_headcount: 8,
                is_leader: true,
                profile_img_url: '',
                start_at: '2023-09-01',
                end_at: '2024-01-01',
                status: 'completed',
                lectures: [
                  {
                    id: 2,
                    title: 'Python 데이터 분석',
                    instructor: '이강사',
                  },
                ],
                review_count: 5,
                star_rating_average: 4.7,
                is_reviewed: true,
              },
              {
                id: 3,
                name: 'TypeScript 심화 스터디',
                current_headcount: 5,
                max_headcount: 6,
                is_leader: false,
                profile_img_url: '',
                start_at: '2023-10-01',
                end_at: '2023-12-01',
                status: 'completed',
                lectures: [
                  {
                    id: 3,
                    title: 'TypeScript 심화',
                    instructor: '박강사',
                  },
                ],
                review_count: 2,
                star_rating_average: 0,
                is_reviewed: false,
              },
            ],
          },
        }
        setStudyGroups(mockData.data.study_groups)
      } catch {
        setIsLoading(false) //일단 넣을게 없어서 넣음
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompletedStudies()
  }, [])

  if (isLoading) {
    return <Loading />
  }

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
        {studyGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {studyGroups.map((study) => (
              <CompletedStudyCard key={study.id} study={study} />
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
