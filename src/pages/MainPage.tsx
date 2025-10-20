import { useNavigate } from 'react-router'
import Button from '../components/common/Button'

function MainPage() {
  const navigate = useNavigate()

  const normalizeBreaks = (text: string) => text.replace(/<br\s*\/?>/gi, '\n')

  return (
    <main className="bg-primary-50 flex flex-col items-center justify-center">
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

      {/* Feature Section */}
      <section className="flex w-[1440px] flex-col items-center justify-center bg-white px-8 py-16">
        <div className="max-w-[1280px] text-center">
          {/* 제목 */}
          <div className="mx-auto mb-12 w-[1216px]">
            <h2 className="mb-4 text-[24px] font-extrabold text-gray-900">
              왜 StudyHub를 선택해야 할까요?
            </h2>
            <p className="text-[16px] leading-[24px] text-[#4B5563]">
              체계적인 학습과 실무 경험을 동시에 얻을 수 있는 최적의
              플랫폼입니다.
            </p>
          </div>

          {/* Feature 아이템 3개 */}
          <div className="flex w-[1216px] justify-center gap-16">
            {/* 1. 다양한 IT 강의 */}
            <div className="flex w-[384px] flex-col items-center">
              <div className="mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-yellow-100 text-3xl text-yellow-500">
                💻
              </div>
              <h3 className="mb-2 text-[18px] font-semibold text-gray-900">
                다양한 IT 강의
              </h3>
              <p className="w-[336px] text-[16px] leading-[24px] text-[#4B5563]">
                프론트엔드부터 백엔드, 데이터사이언스까지
                <br />
                모든 분야의 전문 강의를 제공합니다.
              </p>
            </div>

            {/* 2. 스터디 그룹 */}
            <div className="flex w-[384px] flex-col items-center">
              <div className="mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-green-100 text-3xl text-green-500">
                👥
              </div>
              <h3 className="mb-2 text-[18px] font-semibold text-gray-900">
                스터디 그룹
              </h3>
              <p className="w-[336px] text-[16px] leading-[24px] text-[#4B5563]">
                같은 목표를 가진 사람들과 함께 학습하며
                <br />
                서로 동기부여하고 성장할 수 있습니다.
              </p>
            </div>

            {/* 3. 전문 강사진 */}
            <div className="flex w-[384px] flex-col items-center">
              <div className="mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-500">
                🎓
              </div>
              <h3 className="mb-2 text-[18px] font-semibold text-gray-900">
                전문 강사진
              </h3>
              <p className="w-[336px] text-[16px] leading-[24px] text-[#4B5563]">
                실무 경험이 풍부한 전문가들이 직접 제작한
                <br />
                고품질의 강의 콘텐츠를 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MainPage
