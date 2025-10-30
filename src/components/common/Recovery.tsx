import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { X, Check, Annoyed, RotateCw } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import Button from './Button'
import InputWithLabel from './InputWithLabel'
import Toast from '../common/toast/Toast'

const NeutralEmojiIcon = () => (
  <div className="mb-6 flex justify-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-3 text-yellow-600">
      <Annoyed size={36} />
    </div>
  </div>
)

interface RecoveryProps {
  onClose: () => void
}

const sendCodeAPI = async (email: string) => {
  const res = await axios.post(
    '/api/v1/email-verifications/restore-user/send-code',
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
      },
    }
  )
  return res.data
}

const verifyCodeAPI = async ({
  email,
  code,
}: {
  email: string
  code: string
}) => {
  const res = await axios.post(
    '/api/v1/email-verifications/restore-user/confirm-code',
    { email, code },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return res.data
}

const recoverAccountAPI = async (email: string) => {
  const res = await axios.post(
    '/api/v1/users/recovery-account',
    { email },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return res.data
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

  const sendCodeMutation = useMutation({
    mutationFn: sendCodeAPI,
    onSuccess: (data) => {
      setIsEmailSent(true)
      toast.custom((t) => (
        <Toast
          id={t}
          title="전송 완료!"
          message={data?.detail || '이메일을 확인해주세요.'}
          type="success"
        />
      ))
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error?.response?.data?.error || '이메일 전송에 실패했습니다.'
      toast.custom((t) => (
        <Toast id={t} title="전송 실패" message={message} type="error" />
      ))
    },
  })

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCodeAPI,
    onSuccess: () => {
      setIsVerified(true)
      setErrors({})
      toast.custom((t) => (
        <Toast
          id={t}
          title="인증 완료!"
          message="인증이 완료되었습니다."
          type="success"
        />
      ))
    },
    onError: (error: AxiosError<any>) => {
      setIsVerified(false)
      const message = error?.response?.data?.error || '인증번호 확인 실패'
      toast.custom((t) => (
        <Toast id={t} title="인증 실패" message={message} type="error" />
      ))
    },
  })

  const recoverAccountMutation = useMutation({
    mutationFn: recoverAccountAPI,
    onSuccess: () => {
      setStep(3)
      toast.custom((t) => (
        <Toast
          id={t}
          title="복구 완료!"
          message="계정이 복구되었습니다."
          type="success"
        />
      ))
    },
    onError: (error: AxiosError<any>) => {
      const message = error?.response?.data?.error || '계정 복구 실패'
      toast.custom((t) => (
        <Toast id={t} title="복구 실패" message={message} type="error" />
      ))
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleStartRecovery = () => setStep(2)

  const handleSendCode = async () => {
    if (!formData.email) {
      setErrors({ email: '이메일을 입력해주세요' })
      return
    }
    await sendCodeMutation.mutateAsync(formData.email)
  }

  const handleVerificationCheck = async () => {
    if (!formData.verifyCode) {
      setErrors({ verifyCode: '인증번호를 입력해주세요' })
      return
    }
    await verifyCodeMutation.mutateAsync({
      email: formData.email,
      code: formData.verifyCode,
    })
  }

  const handleNextStep = async () => {
    if (isVerified) {
      await recoverAccountMutation.mutateAsync(formData.email)
    }
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
            <p className="mb-6 px-2 text-center text-sm whitespace-pre-line text-gray-600">
              2025년 9월 20일 이후, 계정 정보는 완전히 삭제돼요.{'\n'}
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </p>
            <Button
              size="freeWidthLg"
              variant="primary"
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
                <RotateCw size={36} />
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
                  label: sendCodeMutation.isPending
                    ? '전송 중...'
                    : '인증코드 전송',
                  onClick: handleSendCode,
                  variant: 'secondary',
                  size: 'sm',
                  disabled: isEmailSent || sendCodeMutation.isPending,
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
                  disabled:
                    isVerified || !isEmailSent || verifyCodeMutation.isPending,
                }}
              />

              <Button
                onClick={handleNextStep}
                disabled={!isVerified || recoverAccountMutation.isPending}
                size="freeWidthLg"
                variant={isVerified ? 'primary' : 'secondary'}
              >
                확인
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="text-green-500" size={28} strokeWidth={3} />
            </div>
            <h3 className="mb-1 text-xl font-bold text-gray-800">
              계정 복구 완료!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              지금 바로 로그인해 보세요
            </p>
            <Button onClick={onClose} size="freeWidthLg" variant="primary">
              확인
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl sm:max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition hover:text-gray-600"
        >
          <X size={24} />
        </button>
        {renderStepContent()}
      </div>
    </div>
  )
}

export default Recovery
