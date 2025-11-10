import { useGetStudyGroups } from '../../api/services/mypage/studyGroup'
import CompletedStudyCard from './CompletedStudyCard'

function CompletedStudyContentsList() {
  // 완료된 스터디 목록 api 훅
  const { data: studyGroupsData, isLoading } = useGetStudyGroups({
    status: 'ENDED',
  })

  const studyGroups = studyGroupsData?.results ?? []

  // 스터디 카드 그리드
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <CompletedStudyCard key={index} isLoading />
        ))}
      </div>
    )
  }

  if (studyGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500">완료된 스터디가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {studyGroups.map((study) => (
        <CompletedStudyCard key={study.uuid} study={study} />
      ))}
    </div>
  )
}

export default CompletedStudyContentsList
