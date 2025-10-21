import { Bookmark, NotebookText, User, Award } from 'lucide-react'

export const MYPAGE_MENU_ITEMS = [
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
    hiddenOnMobile: true,
  },
  {
    id: 'course',
    label: '북마크한 강의',
    subLabel: '저장한 강의 목록',
    path: '/mypage/course',
    icon: <Bookmark size={16} />,
    hiddenOnMobile: true,
  },
  {
    id: 'bookmarks',
    label: '북마크',
    subLabel: '공고 및 강의',
    path: '/mypage/bookmarks',
    icon: <Bookmark size={16} />,
    hiddenOnDesktop: true,
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
