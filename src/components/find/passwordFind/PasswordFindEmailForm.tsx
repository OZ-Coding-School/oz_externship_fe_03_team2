import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import useDebounce from '../../../hooks/useDebounce'
import { useNavigate } from 'react-router'
import type { PasswordFormData } from '../../../pages/PasswordFindPage'
import { LockKeyholeOpen } from 'lucide-react'
import { useEmailVerificationSendCode } from '../../../api/services/find/passwordFind'
import { showToast } from '../../../utils/showToast'

interface PasswordFindEmailFormProps {
  formData: PasswordFormData
  setFormData: React.Dispatch<React.SetStateAction<PasswordFormData>>
  onNext: () => void
}

export default function PasswordFindEmailForm({
  formData,
  setFormData,
  onNext,
}: PasswordFindEmailFormProps) {
  const { mutate, isPending } = useEmailVerificationSendCode()
  const navigate = useNavigate()
  const handleSubmit = () => {
    if (!formData.email || emailError) {
      showToast(
        '형식이 올바르지 않습니다. 확인 후 다시 시도해주세요.',
        'warning',
        '주의가 필요합니다'
      )
      return
    }
    mutate(
      {
        email: formData.email,
      },
      {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            requestId: data?.data.request_id,
            cooldown: data.data.cooldown,
            expires_in: data.data.expires_in,
          }))
          onNext()
        },
      }
    )
  }
  // 이메일 유효성 검사
  const debouncedEmail = useDebounce(formData.email)
  const emailReg =
    debouncedEmail === ''
      ? true
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail)
  const emailError = !emailReg ? '올바른 이메일 형식을 입력해주세요.' : ''

  return (
    <div className="flex w-full max-w-[23rem] flex-col items-center justify-center gap-[1.5rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <LockKeyholeOpen size={28} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem] pb-[1.5rem]">
          <p className="text-[1.125rem] font-semibold">이메일 입력</p>
          <p className="text-[.875rem] text-[#4B5563]">
            가입하신 이메일을 입력하면 인증코드를 보내드립니다
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-[1.5rem]">
        <InputWithLabel
          label="이메일"
          name="email"
          value={formData.email}
          placeholder="example@email.com"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value.trim() }))
          }
          error={emailError}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-1">
        <Button
          size="freeWidthLg"
          onClick={handleSubmit}
          disabled={isPending || formData.cooldown > 0}
        >
          {isPending ? '인증코드 전송 중..' : '인증코드 전송'}
        </Button>
        <Button size="lg" variant="text" onClick={() => navigate('/login')}>
          로그인으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
