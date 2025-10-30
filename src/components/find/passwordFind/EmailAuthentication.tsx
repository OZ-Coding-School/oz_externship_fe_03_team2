import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import { MailCheck } from 'lucide-react'
import type { PasswordFormData } from '../../../pages/PasswordFindPage'
import { showToast } from '../../../utils/showToast'
import {
  useEmailVerificationConfirmCode,
  useEmailVerificationSendCode,
} from '../../../api/services/find/passwordFind'

interface EmailAuthProps {
  formData: PasswordFormData
  setFormData: React.Dispatch<React.SetStateAction<PasswordFormData>>
  onNext: () => void
  onPrev: () => void
}

export default function EmailAuthentication({
  formData,
  setFormData,
  onNext,
  onPrev,
}: EmailAuthProps) {
  const { mutate } = useEmailVerificationConfirmCode()
  const { mutate: codeResendMutate } = useEmailVerificationSendCode()
  const handleSubmit = () => {
    if (!formData.verificationCode) {
      showToast(
        '인증번호가 누락되었습니다. 확인 후 다시 시도해주세요.',
        'warning',
        '주의가 필요합니다'
      )
      return
    }
    mutate(
      {
        email: formData.email,
        verification_code: formData.verificationCode,
        request_id: formData.requestId,
      },
      {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            verify_token: data.data.verify_token,
          }))
          onNext()
          console.log(formData.email)
        },
      }
    )
    // onNext()
  }

  const handleAuthCode = () => {
    codeResendMutate({
      email: formData.email,
    })
  }

  const authReg = /^[0-9]{6}$/.test(formData.verificationCode)

  return (
    <div className="flex w-full max-w-[23rem] flex-col gap-[1.5rem] pb-[1.5rem]">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <MailCheck size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.125rem] font-semibold">이메일 인증</p>
          <p className="text-center text-[.875rem]">
            {formData.email}로 인증코드를 발송했습니다.
          </p>
        </div>
      </div>

      <InputWithLabel
        label="인증코드"
        name="authCode"
        value={formData.verificationCode}
        placeholder="6자리 인증코드 입력"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            verificationCode: e.target.value.trim(),
          }))
        }
        button={{
          label: '재전송',
          onClick: handleAuthCode,
          variant: 'primary',
          countdown: 600,
          cooldown: 60,
        }}
      />

      <Button
        variant="primary"
        size="freeWidthLg"
        onClick={handleSubmit}
        disabled={!authReg}
      >
        인증하기
      </Button>
      <Button variant="outline" size="freeWidthMd" onClick={onPrev}>
        이전 단계
      </Button>
    </div>
  )
}
