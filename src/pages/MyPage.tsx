import { useLocation } from 'react-router'
import MyPageSideBar from '../components/mypage/MyPageSideBar'
import ProfileContents from '../components/mypage/ProfileContents'
import JobsContents from '../components/mypage/JobsContents'
import { MYPAGE_MENU_ITEMS } from '../constants/myPageMenu'
import CourseContents from '../components/mypage/CourseContents'
import StudysContents from '../components/mypage/StudysContents'
import CompletedStudyContents from '../components/mypage/CompletedStudyContents'

function MyPage() {
  const location = useLocation()

  // 현재 경로 기반으로 활성 탭 결정 (기본값: profile)
  const currentActive = location.pathname.split('/mypage/')[1] ?? 'profile'

  const renderContent = () => {
    switch (currentActive) {
      case 'profile':
        return <ProfileContents />
      case 'jobs':
        return <JobsContents />
      case 'course':
        return <CourseContents />
      case 'study':
        return <StudysContents />
      case 'completed-study':
        return <CompletedStudyContents />
      default:
        return <ProfileContents />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1280px] p-4 md:p-6">
        {/* 모바일 - 세로 or 데스크톱 - 가로 */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* 사이드바 (모바일 - 위에, 데스크톱 - 왼쪽) */}
          <MyPageSideBar
            menuItems={MYPAGE_MENU_ITEMS}
            currentActive={currentActive}
          />

          {/* 콘텐츠 (모바일 - 아래, 데스크톱 - 오른쪽) */}
          <main className="w-full flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

export default MyPage
