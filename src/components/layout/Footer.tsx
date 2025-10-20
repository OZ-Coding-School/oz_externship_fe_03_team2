import React from 'react'
import { Link } from 'react-router-dom'
import type { LinkGroup } from '../../types/Footer'

// ------------------------------------------------
// (1) 푸터에 들어갈 실제 링크 데이터입니다.
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
// (2) 작은 컴포넌트: 링크 그룹 (React.FC 제거, Props 타입 직접 지정)
// ------------------------------------------------
const LinkSection = ({ title, links }: LinkGroup) => (
  <div className="flex flex-col">
    <h3 className="mb-4 text-lg font-semibold text-gray-400">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
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
// (3) 메인 푸터 컴포넌트 (React.FC 제거)
// ------------------------------------------------
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 p-10 text-gray-200 md:px-16">
      <div className="mx-auto mb-8 max-w-[1280px] border-b border-gray-700 pb-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
          <div className="flex w-full flex-col md:w-1/3">
            <Link to="/" className="text-primary-400 mb-3 text-2xl font-bold">
              StudyHub
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              IT 전문가로 성장하는 여정에 함께합니다. 최고의 강의와 스터디
              그룹으로 실무 역량을 키워보세요.
            </p>
          </div>

          <LinkSection {...SERVICE_LINKS} />
          <LinkSection {...SUPPORT_LINKS} />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] text-center">
        <p className="text-xs text-gray-500">
          © {currentYear} StudyHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
