import { useState } from 'react'
import StudyApplicationCard from './StudyApplicationCard'

const STUDY_APPLICATIONS_DATA = [
  {
    id: 1,
    title: '프론트엔드 DevOps 스터디',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    participants: 5,
    deadline: '2025. 10. 3.',
    curriculum: [
      'AWS 클라우드 아키텍처 - 인프라구드',
      'Docker & Kubernetes - 이데브옵스',
    ],
    tags: ['DevOps', 'AWS', '클라우드', '인프라'],
    appliedAt: '2024. 02. 10. 오후 02:30',
    status: 'pending' as const,
  },
  {
    id: 2,
    title: '딥러닝 AI 프로젝트 스터디팀 모집',
    image: '',
    participants: 3,
    deadline: '2024. 5. 12.',
    curriculum: [
      '딥러닝 완벽 마스터 - 김딥러닝',
      'TensorFlow 실전 - 박텐서플로',
    ],
    tags: ['딥러닝', 'AI', '머신러닝', 'Python'],
    appliedAt: '2024. 01. 25. 오전 11:15',
    status: 'accepted' as const,
  },
  {
    id: 3,
    title: 'React Native 모바일 앱 개발 스터디',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    participants: 4,
    deadline: '2025. 3. 15.',
    curriculum: ['React Native 기초 - 이모바일', '실전 앱 출시 - 박앱스토어'],
    tags: ['React Native', '모바일', 'JavaScript', 'iOS', 'Android'],
    appliedAt: '2024. 03. 05. 오후 03:20',
    status: 'rejected' as const,
  },
]

function StudysContents() {
  const [applications] = useState(STUDY_APPLICATIONS_DATA)

  return (
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
          {applications.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              지원한 스터디가 없습니다
            </div>
          ) : (
            applications.map((application) => (
              <StudyApplicationCard key={application.id} data={application} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default StudysContents
