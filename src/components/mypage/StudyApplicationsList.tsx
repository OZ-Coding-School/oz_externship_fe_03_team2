import { useState } from 'react'
import { useGetMyApplications } from '../../api/services/mypage/studyApplication'
import type { Application } from '../../types/apiInterface/mypageInterface'
import StudyApplicationCard from './StudyApplicationCard'
import StudyDetailModal from './StudyDetailModal'

function StudyApplicationsList() {
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
              key={application.uuid}
              data={application}
              onClick={() => handleCardClick(application)}
            />
          ))
        )}
      </div>

      <StudyDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        applicationId={selectedApplicationId}
      />
    </>
  )
}

export default StudyApplicationsList
