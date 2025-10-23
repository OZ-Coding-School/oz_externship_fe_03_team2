import React, { useState } from 'react'
import { X, Check } from 'lucide-react'
import Button from './Button'
import InputWithLabel from './InputWithLabel'

const NeutralEmojiIcon = () => (
  <div className="mb-6 flex justify-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-3 text-yellow-600">
      <span className="text-4xl">😐</span>
    </div>
  </div>
)

interface RecoveryProps {
  onClose: () => void
}

function Recovery({ onClose }: RecoveryProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    verifyCode: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleStartRecovery = () => setStep(2)

  const handleSendCode = () => {
    if (!formData.email) {
      setErrors({ email: '이메일을 입력해주세요' })
      return
    }
    setIsEmailSent(true)
    setIsVerified(false)
    setErrors({})
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleVerificationCheck = () => {
    if (!formData.verifyCode) {
      setErrors({ verifyCode: '인증번호를 입력해주세요' })
      return
    }
    if (formData.verifyCode.length === 6) {
      setIsVerified(true)
      setErrors({})
    } else {
      setErrors({ verifyCode: '인증번호 6자리를 정확히 입력해주세요.' })
      setIsVerified(false)
    }
  }

  const handleNextStep = () => {
    if (isVerified) setShowSuccessOverlay(true)
  }

  const handleFinalSuccess = () => onClose()

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <NeutralEmojiIcon />
            <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
              해당 계정은 탈퇴된 상태예요.
            </h2>
            <p className="mb-6 px-2 text-center text-sm whitespace-pre-line text-gray-600">
              2025년 9월 20일 이후, 계정 정보는 완전히 삭제돼요.{'\n'}
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </p>
            <Button
              size="freeWidthLg"
              variant="signup"
              onClick={handleStartRecovery}
            >
              계정 다시 사용하기
            </Button>
          </>
        )

      case 2:
        return (
          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-3 text-yellow-600">
                <span className="text-4xl">🔄</span>
              </div>
            </div>

            <h2 className="mb-1 text-center text-lg font-bold text-gray-800">
              계정 다시 사용하기
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600">
              입력하신 이메일로 인증번호를 보내드릴게요.
            </p>

            <div className="space-y-4">
              <InputWithLabel
                label="이메일"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="가입한 이메일을 입력해 주세요."
                error={errors.email}
                disabled={isEmailSent}
                button={{
                  label: '인증코드 전송',
                  onClick: handleSendCode,
                  variant: 'secondary',
                  size: 'sm',
                  disabled: isEmailSent,
                  countdown: 300,
                }}
              />

              <InputWithLabel
                label="인증번호"
                name="verifyCode"
                value={formData.verifyCode}
                onChange={handleChange}
                placeholder="인증번호 6자리를 입력해주세요."
                error={errors.verifyCode}
                disabled={!isEmailSent || isVerified}
                button={{
                  label: isVerified ? '인증완료' : '인증코드 확인',
                  onClick: handleVerificationCheck,
                  variant: 'secondary',
                  size: 'sm',
                  disabled: isVerified || !isEmailSent,
                }}
              />

              <Button
                onClick={handleNextStep}
                disabled={!isVerified}
                size="freeWidthLg"
                variant={isVerified ? 'signup' : 'secondary'}
              >
                확인
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative flex flex-col items-center">
        {showSuccessOverlay && (
          <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="animate-fadeIn relative flex w-80 flex-col items-center rounded-2xl bg-white p-8 text-center shadow-2xl sm:w-96">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Check className="text-green-500" size={28} strokeWidth={3} />
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-800">
                계정 복구 완료!
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                지금 바로 로그인해 보세요
              </p>
              <Button
                onClick={handleFinalSuccess}
                size="freeWidthLg"
                variant="signup"
              >
                확인
              </Button>
              <button
                onClick={handleFinalSuccess}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        )}

        {showToast && (
          <div className="mb-4 flex transform items-center space-x-2 rounded-lg border border-green-200 bg-white p-3 shadow-lg transition-all duration-300">
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-sm font-semibold whitespace-nowrap text-gray-700">
              전송 완료! 이메일을 확인해주세요.
            </span>
          </div>
        )}

        <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl sm:max-w-lg">
          {!showSuccessOverlay && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 transition hover:text-gray-600"
            >
              <X size={24} />
            </button>
          )}
          {renderStepContent()}
        </div>
      </div>
    </div>
  )
}

export default Recovery
