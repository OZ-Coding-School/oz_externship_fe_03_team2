import { useLocation } from 'react-router'
import MyPageSideBar from '../components/mypage/MyPageSideBar'
import ProfileContents from '../components/mypage/ProfileContents'
import JobsContents from '../components/mypage/JobsContents'
import { MYPAGE_MENU_ITEMS } from '../constants/myPageMenu'

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
      default:
        return <ProfileContents />
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex max-w-[1280px] gap-6 p-6">
        {/* 왼쪽 사이드바 */}
        <MyPageSideBar
          menuItems={MYPAGE_MENU_ITEMS}
          currentActive={currentActive}
        />

        {/* 오른쪽 콘텐츠 */}
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}

export default MyPage
