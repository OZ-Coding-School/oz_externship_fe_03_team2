import { useNavigate } from 'react-router'
import Button from '../components/common/Button'
import { FeaturesData } from '../components/mainpage'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import PopularCoursesSection from '../components/mainpage/PopularCoursesSection'
import ErrorFallback from '../components/common/ErrorFallback'
import { handleExternalUrl } from '../utils/navigateUtils'
function MainPage() {
  useDocumentTitle()
  const navigate = useNavigate()

  const normalizeBreaks = (text: string) => text.replace(/<br\s*\/?>/gi, '\n')

  return (
    <main className="bg-primary-50 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex w-full max-w-7xl flex-col justify-center gap-10 px-6 py-12 sm:flex-row sm:justify-between sm:gap-12 sm:px-8 sm:py-20">
        {/* 왼쪽 텍스트 */}
        <div className="flex w-full max-w-xl flex-col text-center sm:text-left">
          <h1 className="mb-4 text-4xl leading-snug font-extrabold sm:mb-6 sm:text-5xl sm:leading-tight">
            <span className="text-gray-900">IT 전문 지식을</span>
            <br />
            <span className="text-primary-600">함께 배워나가세요</span>
          </h1>

          <p className="mb-8 text-sm leading-6 text-gray-600 sm:text-lg sm:leading-7">
            {normalizeBreaks(
              '최고의 강사진과 함께하는 IT 강의와 스터디 그룹으로 실무 역량을 키워보세요.<br/>지금 시작하면 한 달 뒤의 당신은 분명 달라집니다.'
            )}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <Button
              onClick={() =>
                handleExternalUrl('https://learn.ozcoding.site/lecture')
              }
              className="bg-primary-500 hover:bg-primary-600 h-12 w-full max-w-xs cursor-pointer rounded-lg text-white sm:h-12 sm:w-44"
            >
              강의 둘러보기
            </Button>

            <Button
              onClick={() => handleExternalUrl('https://study.ozcoding.site/')}
              className="border-primary-500 text-primary-600 hover:bg-primary-100 h-12 w-full max-w-xs cursor-pointer rounded-lg border sm:h-12 sm:w-44"
            >
              스터디 그룹 참여
            </Button>
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="mx-auto flex h-56 w-full max-w-[340px] items-center justify-center overflow-hidden rounded-2xl shadow-md sm:h-96 sm:max-w-xl">
          <img
            src="/images/mainBannerImg.png"
            alt="스터디룸"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="w-full max-w-[1280px] text-center">
          <div className="mx-auto mb-10 w-full max-w-[1216px]">
            <h2 className="mb-3 text-xl font-extrabold text-gray-900 sm:mb-4 sm:text-2xl">
              왜 StudyHub를 선택해야할까요?
            </h2>
            <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-6">
              체계적인 학습과 실무 경험을 동시에 얻을 수 있는 최적의
              플랫폼입니다.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
            {FeaturesData.map(
              ({ icon: Icon, bgColor, textColor, title, description }, i) => (
                <div
                  key={i}
                  className="flex w-full max-w-[360px] flex-col items-center text-center sm:max-w-[384px]"
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${bgColor} ${textColor} sm:h-20 sm:w-20`}
                  >
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                    {title}
                  </h3>
                  <p className="w-full max-w-[300px] text-sm leading-6 whitespace-pre-line text-gray-600 sm:max-w-[336px] sm:text-base sm:leading-6">
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* 인기 강의 Section */}
      <section className="flex w-full flex-col items-center justify-center bg-white px-6 py-16 sm:px-8">
        <div className="w-full max-w-[1280px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-xl font-extrabold text-gray-900 sm:text-2xl">
                인기 강의
              </h2>
              <p className="text-sm text-gray-600 sm:text-base">
                지금 가장 많은 사람들이 수강하는 강의들
              </p>
            </div>
            <button
              onClick={() => navigate('https://learn.ozcoding.site/lecture')}
              className="text-primary-600 cursor-pointer text-sm font-medium hover:underline"
            >
              모든 강의 보기 →
            </button>
          </div>

          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
                <PopularCoursesSection />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full justify-center bg-yellow-500 px-6 py-20">
        <div className="flex w-full max-w-[1280px] flex-col items-center text-center text-white">
          <h2 className="mb-4 text-2xl font-extrabold sm:text-3xl">
            지금 시작하여 IT 전문가가 되어보세요!
          </h2>
          <p className="mb-10 text-base sm:text-lg">
            수백 개의 강의와 활발한 스터디 그룹이 여러분을 기다리고 있습니다.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Button
              variant="outline"
              className="h-12 w-44 cursor-pointer rounded-lg border-none bg-white text-yellow-500 hover:bg-yellow-100 hover:text-yellow-700"
              onClick={() => navigate('/signup')}
            >
              무료로 시작하기
            </Button>
            <Button
              variant="outline"
              className="h-12 w-48 cursor-pointer rounded-lg border border-white text-white hover:bg-white hover:text-yellow-500"
              onClick={() =>
                handleExternalUrl(
                  'https://study.ozcoding.site/create_study_group'
                )
              }
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
