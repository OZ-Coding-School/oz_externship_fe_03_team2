import { useNavigate } from 'react-router'
import Button from '../components/common/Button'
import ImageCards from '../components/common/ImageCards'
import { Laptop, Users, GraduationCap } from 'lucide-react'

function MainPage() {
  const navigate = useNavigate()
  const normalizeBreaks = (text: string) => text.replace(/<br\s*\/?>/gi, '\n')

  return (
    <main className="bg-primary-50 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-6 py-12 sm:flex-row sm:justify-between sm:gap-12 sm:px-8 sm:py-20">
        {/* 왼쪽 텍스트 */}
        <div className="flex w-full max-w-[584px] flex-col text-center sm:text-left">
          <h1 className="mb-4 text-[32px] leading-[42px] font-extrabold sm:mb-6 sm:text-[48px] sm:leading-[60px]">
            <span className="text-gray-900">IT 전문 지식을</span>
            <br />
            <span className="text-primary-600">함께 배워나가세요</span>
          </h1>

          <p className="mb-8 text-[15px] leading-[24px] text-gray-600 sm:text-[18px] sm:leading-[28px]">
            {normalizeBreaks(
              '최고의 강사진과 함께하는 IT 강의와 스터디 그룹으로 실무 역량을 키워보세요.<br/>지금 시작하면 한 달 뒤의 당신은 분명 달라집니다.'
            )}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <Button
              onClick={() => navigate('/signup')}
              className="!bg-primary-500 hover:!bg-primary-600 !h-[48px] !w-full max-w-[300px] !rounded-[8px] !text-white sm:!h-[50px] sm:!w-[177px]"
            >
              강의 둘러보기
            </Button>

            <Button
              onClick={() => navigate('/studygroups')} //임시경로작성
              className="!border-primary-500 !text-primary-600 hover:!bg-primary-100 !h-[48px] !w-full max-w-[300px] !rounded-[8px] !border sm:!h-[50px] sm:!w-[177px]"
            >
              스터디 그룹 참여
            </Button>
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="h-[220px] w-full max-w-[340px] overflow-hidden rounded-2xl shadow-md sm:h-[389px] sm:max-w-[584px]">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
            alt="스터디룸"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="w-full max-w-[1280px] text-center">
          <div className="mx-auto mb-10 w-full max-w-[1216px]">
            <h2 className="mb-3 text-[20px] font-extrabold text-gray-900 sm:mb-4 sm:text-[24px]">
              왜 StudyHub를 선택해야할까요?
            </h2>
            <p className="text-[14px] leading-[22px] text-[#4B5563] sm:text-[16px] sm:leading-[24px]">
              체계적인 학습과 실무 경험을 동시에 얻을 수 있는 최적의
              플랫폼입니다.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
            <div className="flex w-full max-w-[360px] flex-col items-center text-center sm:max-w-[384px]">
              <div className="mb-4 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-yellow-100 text-yellow-500 sm:h-[80px] sm:w-[80px]">
                <Laptop className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-gray-900 sm:text-[18px]">
                다양한 IT 강의
              </h3>
              <p className="w-full max-w-[300px] text-[14px] leading-[22px] text-[#4B5563] sm:max-w-[336px] sm:text-[16px] sm:leading-[24px]">
                프론트엔드부터 백엔드, 데이터사이언스까지
                <br />
                모든 분야의 전문 강의를 제공합니다.
              </p>
            </div>

            <div className="flex w-full max-w-[360px] flex-col items-center text-center sm:max-w-[384px]">
              <div className="mb-4 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-green-100 text-green-500 sm:h-[80px] sm:w-[80px]">
                <Users className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-gray-900 sm:text-[18px]">
                스터디 그룹
              </h3>
              <p className="w-full max-w-[300px] text-[14px] leading-[22px] text-[#4B5563] sm:max-w-[336px] sm:text-[16px] sm:leading-[24px]">
                같은 목표를 가진 사람들과 함께 학습하며
                <br />
                서로 동기부여하고 성장할 수 있습니다.
              </p>
            </div>

            <div className="flex w-full max-w-[360px] flex-col items-center text-center sm:max-w-[384px]">
              <div className="mb-4 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-purple-100 text-purple-500 sm:h-[80px] sm:w-[80px]">
                <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-gray-900 sm:text-[18px]">
                전문 강사진
              </h3>
              <p className="w-full max-w-[300px] text-[14px] leading-[22px] text-[#4B5563] sm:max-w-[336px] sm:text-[16px] sm:leading-[24px]">
                실무 경험이 풍부한 전문가들이 직접 제작한
                <br />
                고품질의 강의 콘텐츠를 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 강의 Section */}
      <section className="flex w-full flex-col items-center justify-center bg-white px-6 py-16 sm:px-8">
        <div className="w-full max-w-[1280px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-[20px] font-extrabold text-gray-900 sm:text-[24px]">
                인기 강의
              </h2>
              <p className="text-[14px] text-gray-600 sm:text-[16px]">
                지금 가장 많은 사람들이 수강하는 강의들
              </p>
            </div>
            <button className="text-primary-600 text-[14px] font-medium">
              모든 강의 보기 →
            </button>
          </div>

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            {[
              {
                title: 'React 완전 마스터 강의',
                description: '김개발',
                date: '₩59,000원',
                imageUrl:
                  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
              },
              {
                title: 'Python 데이터 사이언스',
                description: '이분석',
                date: '₩99,000원',
                imageUrl:
                  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
              },
              {
                title: 'AWS 클라우드 아키텍처',
                description: '한클라우드',
                date: '₩129,000원',
                imageUrl:
                  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
              },
            ].map((course, index) => (
              <ImageCards
                key={index}
                title={course.title}
                description={course.description}
                date={course.date}
                imageUrl={course.imageUrl}
                size="w-full sm:w-[384px] h-[17.375rem]"
                onClick={() => navigate('/popularcourses')} //임시경로작성
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full justify-center bg-[#E0B43A] px-6 py-20">
        <div className="flex w-full max-w-[1280px] flex-col items-center text-center text-white">
          <h2 className="mb-4 text-[24px] leading-[32px] font-extrabold sm:text-[28px] sm:leading-[38px]">
            지금 시작하여 IT 전문가가 되어보세요!
          </h2>
          <p className="mb-10 text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px]">
            수백 개의 강의와 활발한 스터디 그룹이 여러분을 기다리고 있습니다.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Button
              variant="outline"
              className="!h-[52px] !w-[180px] !rounded-lg !border-none !bg-white !text-[#E0B43A] hover:!bg-[#fdf7e3] hover:!text-[#C58C00]"
              onClick={() => navigate('/signup')}
            >
              무료로 시작하기
            </Button>
            <Button
              variant="outline"
              className="!h-[52px] !w-[200px] !rounded-lg !border !border-white !text-white hover:!bg-white hover:!text-[#E0B43A]"
              onClick={() => navigate('/studygroups')} //임시경로작성
            >
              스터디 그룹 만들기
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MainPage
