import React, { useState } from 'react'
import { Link } from 'react-router-dom' // 라우팅을 위해 Link 컴포넌트 사용

// 임시 아이콘 컴포넌트 (팀의 아이콘 라이브러리에 맞춰 교체하세요)
const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)
const SuccessIcon = () => (
  <svg
    className="mx-auto h-10 w-10 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface RecoveryProps {
  onClose: () => void // 모달을 닫는 함수
}

// ✅ 함수 선언문 스타일 (팀 컨벤션 반영)
function Recovery({ onClose }: RecoveryProps) {
  // 1: 탈퇴 상태 확인 (초기 로그인 화면 팝업)
  // 2: 이메일 인증 요청/입력 (인증 코드 전송 전후 포함)
  // 3: 성공 팝업
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  // 더미 핸들러 (UI 전환만 담당)

  // STEP 1: '계정 다시 사용하기' 버튼 클릭 시
  const handleStartRecovery = () => {
    // 실제 로직: 이메일과 비밀번호가 탈퇴 회원 정보와 일치하는지 확인 후
    setStep(2) // 2단계 (인증 입력)으로 전환
  }

  // STEP 2: '확인' 버튼 클릭 시 (인증 코드 입력 후)
  const handleVerificationSubmit = () => {
    // 실제 로직: 인증 코드 확인 API 호출 성공 가정
    setStep(3) // 3단계 (성공 팝업)으로 전환
  }

  // STEP 3: 성공 팝업에서 '확인' 버튼 클릭 시
  const handleFinalSuccess = () => {
    // 실제 로직: 복구 완료 후 로그인 페이지로 이동
    onClose() // 모달 닫기
    // window.location.href = '/auth/login'; // 최종 로그인 페이지로 이동하는 코드
  }

  // ------------------------------------------------
  // 컴포넌트 렌더링 함수: 단계별 내용 분리
  // ------------------------------------------------

  const renderStepContent = () => {
    switch (step) {
      case 1: // 1단계: 탈퇴 상태 확인 및 복구 시작
        return (
          <>
            <h2 className="mb-4 text-xl font-bold">
              해당 계정은 탈퇴된 상태예요.
            </h2>
            <div className="mb-6 text-gray-600">
              2025년 9월 20일 이후, 계정 정보는 완전히 삭제돼요. <br />
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </div>

            <button
              onClick={handleStartRecovery}
              className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-white transition duration-150 hover:bg-yellow-600"
            >
              계정 다시 사용하기
            </button>
            {/* 이메일/비밀번호 입력 필드는 로그인 페이지 본문 레이아웃에 있다고 가정 */}
          </>
        )

      case 2: // 2단계: 이메일 인증 요청 및 입력
        return (
          <>
            {/* 인증 전송 성공 메시지 (와이어프레임 2단계의 상단 알림) */}
            <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 transform items-center rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-sm text-green-700">
              <SuccessIcon />
              <span className="ml-2">전송 완료! 이메일을 확인해주세요.</span>
            </div>

            <h2 className="mb-4 text-xl font-bold">계정 다시 사용하기</h2>
            <div className="mb-6 text-gray-600">
              입력하신 이메일로 인증번호를 보내드릴게요.
            </div>

            <div className="space-y-4">
              {/* 이메일 입력 및 전송 버튼 */}
              <label
                htmlFor="recovery-email"
                className="block text-sm font-semibold text-gray-700"
              >
                이메일*
              </label>
              <div className="flex space-x-2">
                <input
                  id="recovery-email"
                  type="email"
                  placeholder="가입한 이메일을 입력해 주세요."
                  className="flex-grow rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => alert('인증 코드 전송 로직 실행')}
                  className="rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-700 hover:bg-gray-300"
                >
                  인증코드전송
                </button>
              </div>

              {/* 인증 코드 입력 및 확인 */}
              <div className="relative flex space-x-2">
                <input
                  type="text"
                  placeholder="인증번호 6자리를 입력해주세요."
                  className="flex-grow rounded-lg border border-gray-300 p-3 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                />
                {/* 타이머 UI (UI 구현을 위해 텍스트로 고정) */}
                <span className="absolute top-1/2 right-[115px] -translate-y-1/2 transform text-sm font-bold text-red-500">
                  05:00
                </span>
                <button
                  onClick={() => alert('인증 코드 확인 로직 실행')}
                  className="rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-700 hover:bg-gray-300"
                >
                  인증코드확인
                </button>
              </div>

              <button
                onClick={handleVerificationSubmit}
                className="mt-4 w-full rounded-lg bg-yellow-500 py-3 font-bold text-white hover:bg-yellow-600"
              >
                확인
              </button>
            </div>
          </>
        )

      case 3: // 3단계: 계정 복구 성공 팝업
        return (
          <div className="py-6 text-center">
            <SuccessIcon />
            <h2 className="mt-4 mb-2 text-2xl font-bold">계정 복구 완료!</h2>
            <p className="mb-6 text-gray-600">지금 바로 로그인해 보세요.</p>
            <button
              onClick={handleFinalSuccess}
              className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-white transition duration-150 hover:bg-yellow-600"
            >
              확인
            </button>
          </div>
        )

      default:
        return null
    }
  }

  // ------------------------------------------------
  // 모달 레이아웃 (공통)
  // ------------------------------------------------
  return (
    // 배경 오버레이
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* 모달 본문 */}
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>

        {renderStepContent()}
      </div>
    </div>
  )
}

export default Recovery
