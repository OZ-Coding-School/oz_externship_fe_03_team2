import { useLocation } from 'react-router'
import MyPageSideBar from '../components/mypage/MyPageSideBar'
import ProfileContents from '../components/mypage/ProfileContents'
import { Bookmark, NotebookText, User, Award } from 'lucide-react'
import JobsContents from '../components/mypage/JobsContents'

function MyPage() {
  const location = useLocation()

  // 현재 경로 기반으로 활성 탭 결정 (기본값: profile)
  const currentActive = location.pathname.split('/mypage/')[1] ?? 'profile'

  const menuItems = [
    {
      id: 'profile',
      label: '내 정보',
      subLabel: '개인 정보 조회 및 수정',
      path: '/mypage/profile',
      icon: <User size={16} />,
    },
    {
      id: 'jobs',
      label: '북마크한 공고',
      subLabel: '저장한 공고 목록',
      path: '/mypage/jobs',
      icon: <Bookmark size={16} />,
    },
    {
      id: 'course',
      label: '북마크한 강의',
      subLabel: '저장한 강의 목록',
      path: '/mypage/course',
      icon: <Bookmark size={16} />,
    },
    {
      id: 'study',
      label: '지원 내역',
      subLabel: '스터디 지원 현황',
      path: '/mypage/study',
      icon: <NotebookText size={16} />,
    },
    {
      id: 'completed-study',
      label: '완료된 스터디',
      subLabel: '수료한 스터디 목록',
      path: '/mypage/completed-study',
      icon: <Award size={16} />,
    },
  ]

  const renderContent = () => {
    switch (currentActive) {
      case 'profile':
        return <ProfileContents />
      case 'jobs':
        return <JobsContents />
      default:
        return <ProfileContents />
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex max-w-[1280px] gap-6 p-6">
        {/* 왼쪽 사이드바 */}
        <MyPageSideBar menuItems={menuItems} />

        {/* 오른쪽 콘텐츠 */}
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}

export default MyPage
