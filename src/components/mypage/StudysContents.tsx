import { useEffect, useState } from 'react'
import StudyApplicationCard from './StudyApplicationCard'
import StudyDetailModal from './StudyDetailModal'

interface StudyApplication {
  id: number
  title: string
  image: string
  participants: number
  deadline: string
  curriculum: string[]
  tags: string[]
  appliedAt: string
  status: 'pending' | 'success'
}

interface ApplicationsResponse {
  status: number
  message: string
  data: {
    applications: StudyApplication[]
  }
}

function StudysContents() {
  const [applications, setApplications] = useState<StudyApplication[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        // 더미 데이터
        const mockData: ApplicationsResponse = {
          status: 200,
          message: '스터디 지원 내역 조회에 성공했습니다.',
          data: {
            applications: [
              {
                id: 1,
                title: '프론트엔드 DevOps 스터디',
                image:
                  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
                participants: 5,
                deadline: '2025-10-03.',
                curriculum: [
                  'AWS 클라우드 아키텍처 - 한클라우드',
                  'Docker & Kubernetes - 이데브옵스',
                ],
                tags: ['DevOps', 'AWS', '클라우드', '인프라'],
                appliedAt: '2024. 02. 10. 오후 02:30',
                status: 'pending',
              },
              {
                id: 2,
                title: '딥러닝 AI 프로젝트 스터디팀 모집',
                image: '',
                participants: 3,
                deadline: '2024-05-12.',
                curriculum: [
                  '딥러닝 완벽 마스터 - 김딥러닝',
                  'TensorFlow 실전 - 박텐서플로',
                ],
                tags: ['딥러닝', 'AI', '머신러닝', 'Python'],
                appliedAt: '2024. 01. 25. 오전 11:15',
                status: 'success',
              },
            ],
          },
        }
        setApplications(mockData.data.applications)
      } catch {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const handleCardClick = (application: StudyApplication) => {
    setSelectedApplicationId(application.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedApplicationId(null)
  }

  return (
    <>
      <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
        <div className="mx-auto max-w-5xl">
          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">지원 내역</h1>
            <p className="text-gray-600">
              내가 지원한 스터디 구인 공고들을 확인하세요
            </p>
          </div>

          {/* 지원 내역 리스트 */}
          <div className="space-y-4">
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <StudyApplicationCard key={index} isLoading />
              ))
            ) : applications.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                지원한 스터디가 없습니다
              </div>
            ) : (
              applications.map((application) => (
                <StudyApplicationCard
                  key={application.id}
                  data={application}
                  onClick={() => handleCardClick(application)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <StudyDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        applicationId={selectedApplicationId}
      />
    </>
  )
}

export default StudysContents
