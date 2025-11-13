import { useState } from 'react'
import StudyApplicationCardMobile from './StudyApplicationCardMobile'
import StudyDetailModal from '../StudyDetailModal'
import { useGetMyApplications } from '../../../api/services/mypage/studyApplication'
import type { Application } from '../../../types/apiInterface/mypageInterface'

function StudysContentsMobile() {
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // api 훅
  const { data, isLoading } = useGetMyApplications()

  const applications = data?.data ?? []

  const handleCardClick = (application: Application) => {
    setSelectedApplicationId(application.uuid)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedApplicationId(null)
  }

  return (
    <>
      <div className="min-h-screen rounded-xl border border-gray-200 bg-white">
        {/* 헤더 */}
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">지원 내역</h1>
          <p className="mt-1 text-sm text-gray-600">
            내가 지원한 스터디 구인 공고들을 확인하세요
          </p>
        </div>

        {/* 지원 내역 리스트 */}
        <div className="p-4">
          <div className="space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <StudyApplicationCardMobile key={index} isLoading />
              ))
            ) : applications.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                지원한 스터디가 없습니다
              </div>
            ) : (
              applications.map((application) => (
                <StudyApplicationCardMobile
                  key={application.uuid}
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

export default StudysContentsMobile
