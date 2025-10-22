import React, { useState } from 'react'
import { Mail, X, CheckCircle, Send, User } from 'lucide-react'
import Button from './Button'
import InputWithLabel from './InputWithLabel'

const SuccessIcon = () => (
  <CheckCircle size={48} className="mx-auto text-yellow-500" />
)

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
  const [showToast, setShowToast] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleStartRecovery = () => {
    setStep(2)
  }

  const handleSendCode = () => {
    if (!formData.email) {
      setErrors({ email: '이메일을 입력해주세요' })
      return
    }

    setIsEmailSent(true)
    setErrors({})

    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleVerificationCheck = () => {
    if (!formData.verifyCode) {
      setErrors({ verifyCode: '인증번호를 입력해주세요' })
      return
    }
    setStep(3)
  }

  const handleFinalSuccess = () => {
    onClose()
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <NeutralEmojiIcon />

            <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
              해당 계정은 탈퇴된 상태예요.
            </h2>
            <div className="mb-6 px-2 text-center text-sm whitespace-pre-line text-gray-600">
              2025년 9월 20일 이후, 계정 정보는 완전히 삭제돼요.{'\n'}
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </div>

            <button
              onClick={handleStartRecovery}
              className="h-12 w-full rounded-lg bg-yellow-500 font-semibold text-gray-800 shadow-md transition duration-150 hover:bg-yellow-600"
            >
              계정 다시 사용하기
            </button>
          </>
        )

      case 2:
        return (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-3 text-yellow-600">
                <span className="text-4xl">🔄</span>
              </div>
            </div>

            <h2 className="mb-1 text-center text-lg font-bold text-gray-800">
              계정 다시 사용하기
            </h2>
            <div className="mb-6 text-center text-sm text-gray-600">
              입력하신 이메일로 인증번호를 보내드릴게요.
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-800"
                >
                  이메일*
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="가입한 이메일을 입력해 주세요."
                      className={`h-10 w-full border px-3 py-2 ${errors['email'] ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:bg-gray-50`}
                      disabled={isEmailSent}
                    />
                    {errors['email'] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors['email']}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSendCode}
                    className={`flex-shrink-0 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition duration-150 ${isEmailSent ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    disabled={isEmailSent}
                  >
                    인증코드 전송
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <input
                      id="verifyCode"
                      name="verifyCode"
                      type="text"
                      value={formData.verifyCode}
                      onChange={handleChange}
                      placeholder="인증번호 6자리를 입력해주세요."
                      className={`h-10 w-full border px-3 py-2 ${errors['verifyCode'] ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500`}
                    />
                    {errors['verifyCode'] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors['verifyCode']}
                      </p>
                    )}

                    {isEmailSent && (
                      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-xs font-bold text-red-500">
                        05:00
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleVerificationCheck}
                    className="flex-shrink-0 rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold whitespace-nowrap text-gray-700 shadow-sm transition duration-150 hover:bg-gray-300"
                  >
                    인증코드 확인
                  </button>
                </div>
                <button
                  onClick={handleFinalSuccess}
                  className="mt-4 h-12 w-full rounded-lg bg-yellow-500 font-semibold text-gray-800 shadow-md transition duration-150 hover:bg-yellow-600"
                >
                  확인
                </button>
              </div>
            </div>
          </>
        )

      case 3:
        return (
          <div className="py-6 text-center">
            <SuccessIcon />
            <h2 className="mt-4 mb-2 text-xl font-bold text-gray-800">
              계정 복구 완료!
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              지금 바로 로그인해 보세요.
            </p>
            <button
              onClick={handleFinalSuccess}
              className="h-12 w-full rounded-lg bg-yellow-500 font-semibold text-gray-800 shadow-md transition duration-150 hover:bg-yellow-600"
            >
              확인
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative flex flex-col items-center">
        {showToast && (
          <div className="mb-4 flex items-center space-x-2 rounded-lg border border-green-200 bg-white p-3 shadow-xl transition-opacity duration-300">
            <CheckCircle size={18} className="text-green-500" />
            <span className="text-sm font-semibold whitespace-nowrap text-gray-700">
              전송 완료! 이메일을 확인해주세요.
            </span>
          </div>
        )}

        <div className="relative w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 transition hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {renderStepContent()}
        </div>
      </div>
    </div>
  )
}

export default Recovery
