import { Link } from 'react-router'

interface FooterLink {
  label: string
  path: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: '서비스',
    links: [
      { label: '강의 목록', path: '/' },
      { label: '스터디 그룹', path: '/' },
      { label: '구인 공고', path: '/' },
    ],
  },
  {
    title: '지원',
    links: [
      { label: '고객센터', path: '/' },
      { label: 'FAQ', path: '/' },
      { label: '개인정보처리방침', path: '/' },
    ],
  },
]

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:gap-1z2 mb-12 flex flex-col gap-8 md:flex-row lg:gap-12">
          {/* 왼쪽 StudyHub */}
          <div className="max-w-148 flex-2">
            <h2 className="text-primary-400 mb-4 text-2xl font-bold">
              StudyHub
            </h2>
            <p className="leading-nomal text-gray-300">
              IT 전문가로 성장하는 여정에 함께합니다. 최고의 강의와 스터디
              그룹으로 실무 역량을 키워보세요.
            </p>
          </div>

          {/* 오른쪽 섹션 */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex-1">
              <h3 className="mb-5 text-base font-semibold">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-primary-400 text-gray-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2024 StudyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
