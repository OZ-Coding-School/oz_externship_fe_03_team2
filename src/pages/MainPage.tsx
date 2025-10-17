import { useNavigate } from 'react-router'
import Button from '../components/common/Button'

function MainPage() {
  const navigate = useNavigate()

  const normalizeBreaks = (text: string) => text.replace(/<br\s*\/?>/gi, '\n')

  return (
    <main className="bg-primary-50 flex justify-center">
      {/* Hero Section */}
      <section className="flex w-[1440px] justify-center px-8 py-20">
        <div className="flex max-w-[1280px] items-center justify-between gap-12">
          {/* 왼쪽 텍스트 */}
          <div className="w-[584px]">
            <h1 className="mb-6 text-[48px] leading-[60px] font-extrabold whitespace-pre-line">
              <span className="text-gray-900">IT 전문 지식을</span>
              {'\n'}
              <span className="text-primary-600">함께 배워나가세요</span>
            </h1>

            <p className="mb-8 text-[18px] leading-[28px] whitespace-pre-line text-gray-600">
              {normalizeBreaks(
                '최고의 강사진과 함께하는 IT 강의와 스터디 그룹으로 실무 역량을 키워보세요.<br/>지금 시작하면 한 달 뒤의 당신은 분명 달라집니다.'
              )}
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/signup')}
                className="!bg-primary-500 hover:!bg-primary-600 !h-[50px] !w-[177px] !rounded-[8px] !px-[33px] !py-[13px] !text-white"
              >
                강의 둘러보기
              </Button>

              <Button
                onClick={() => navigate('/studygroups')} // 경로임시작성
                className="!border-primary-500 !text-primary-600 hover:!bg-primary-100 !h-[50px] !w-[177px] !rounded-[8px] !border !px-[33px] !py-[13px]"
              >
                스터디 그룹 참여
              </Button>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="h-[389px] w-[584px] overflow-hidden rounded-2xl shadow-md">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
              alt="스터디룸"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default MainPage
