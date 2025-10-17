import React from 'react'
import { Link } from 'react-router'

// ------------------------------------------------
// (1) TypeScript: 푸터 링크 데이터의 타입을 정의합니다.
// ------------------------------------------------
interface LinkItem {
  text: string
  url: string // 이동할 URL 주소
}

interface LinkGroup {
  title: string
  links: LinkItem[]
}

// ------------------------------------------------
// (2) 푸터에 들어갈 실제 링크 데이터입니다.
// ------------------------------------------------
const SERVICE_LINKS: LinkGroup = {
  title: '서비스',
  links: [
    { text: '강의 목록', url: '/courses' },
    { text: '스터디 그룹', url: '/studies' },
    { text: '구인 공고', url: '/jobs' },
  ],
}

const SUPPORT_LINKS: LinkGroup = {
  title: '지원',
  links: [
    { text: '고객센터', url: '/support' },
    { text: 'FAQ', url: '/faq' },
    { text: '개인정보처리방침', url: '/privacy' },
  ],
}

// ------------------------------------------------
// (3) 작은 컴포넌트: 링크 그룹을 반복해서 생성합니다. (재사용성 확보)
// ------------------------------------------------
const LinkSection: React.FC<LinkGroup> = ({ title, links }) => (
  <div className="flex flex-col">
    {/* 제목: 굵은 글씨, gray-400 텍스트 */}
    <h3 className="mb-4 text-lg font-semibold text-gray-400">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
          {/* Link 컴포넌트: hover 시 primary-400 (노란색)으로 색상 변경 */}
          <Link
            to={link.url}
            className="hover:text-primary-400 text-sm text-gray-200 transition-colors duration-150"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

// ------------------------------------------------
// (4) 메인 푸터 컴포넌트
// ------------------------------------------------
const Footer: React.FC = () => {
  // 현재 연도를 동적으로 가져와 저작권에 사용
  const currentYear = new Date().getFullYear()

  return (
    // 배경색: gray-900, 텍스트 색상: gray-200, 패딩: p-10 (모바일), md:px-16 (데스크탑)
    <footer className="bg-gray-900 p-10 text-gray-200 md:px-16">
      {/* 3단 레이아웃을 위한 컨테이너 (최대 폭 1280px) */}
      <div className="mx-auto mb-8 max-w-[1280px] border-b border-gray-700 pb-10">
        {/* 반응형 Flexbox: 모바일(flex-col), 데스크탑(md:flex-row) */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
          {/* 섹션 1: 브랜드 소개 */}
          <div className="flex w-full flex-col md:w-1/3">
            {/* StudyHub 로고/이름: primary-400 (노란색 강조) */}
            <Link to="/" className="text-primary-400 mb-3 text-2xl font-bold">
              StudyHub
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              IT 전문가로 성장하는 여정에 함께합니다. 최고의 강의와 스터디
              그룹으로 실무 역량을 키워보세요.
            </p>
          </div>

          {/* 섹션 2 & 3 */}
          <LinkSection {...SERVICE_LINKS} />
          <LinkSection {...SUPPORT_LINKS} />
        </div>
      </div>

      {/* 하단 저작권 섹션 */}
      <div className="mx-auto max-w-[1280px] text-center">
        <p className="text-xs text-gray-500">
          © {currentYear} StudyHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
