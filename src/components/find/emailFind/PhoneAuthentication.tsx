import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import type { FormData } from '../../../pages/EmailFindPage'
import { Phone } from 'lucide-react'
import {
  useFindEmailConfirmCode,
  useFindEmailSendCode,
} from '../../../api/services/find/emailFind'
import { showToast } from '../../../utils/showToast'

interface PhoneAuthProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onNext: () => void
  onPrev: () => void
}

export default function PhoneAuthentication({
  formData,
  setFormData,
  onNext,
  onPrev,
}: PhoneAuthProps) {
  const { mutate } = useFindEmailConfirmCode()
  const { mutate: codeResendMutate } = useFindEmailSendCode()

  const handleSubmit = () => {
    if (!formData.code) {
      showToast(
        '인증번호가 누락되었습니다. 확인 후 다시 시도해주세요.',
        'warning',
        '주의가 필요합니다'
      )
      return
    }
    mutate(
      {
        phone_number: formData.phone,
        code: formData.code,
        request_id: formData.request_id,
      },
      {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            phone_verify_token: data.data.phone_verify_token,
          }))
          onNext()
        },
      }
    )
  }

  const handleAuthCode = () => {
    codeResendMutate(
      { phone_number: formData.phone },
      {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            request_id: data.data.request_id,
            expires_in: data.data.expires_in,
            cooldown: data.data.cooldown,
            //성공헀을 떄만 쿨타임 초기화 되고 실패헀을 떄는 초기화 안 되게..
          }))
        },
        onError: (data) => {
          showToast(data.error, 'error')
        },
      }
    )
  }

  const authReg = /^[0-9]{6}$/.test(formData.code)

  return (
    <div className="flex w-full max-w-[23rem] flex-col gap-[1.5rem] pb-[1.5rem]">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <Phone size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.125rem] font-semibold">휴대폰 인증</p>
          <p className="text-center text-[.875rem]">
            &apos;{formData.phone}&apos; 로 인증코드를 발송했습니다.
          </p>
        </div>
      </div>

      <InputWithLabel
        label="인증코드"
        name="authCode"
        value={formData.code}
        placeholder="6자리 인증코드 입력"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, code: e.target.value.trim() }))
        }
        button={{
          label: '재전송',
          onClick: handleAuthCode,
          variant: 'primary',
          countdown: formData.expires_in,
          cooldown: formData.cooldown,
          start: true,
        }}
      />

      <Button
        variant="primary"
        size="freeWidthLg"
        onClick={() => {
          handleSubmit()
          setFormData((prev) => ({ ...prev, cooldown: 0, expires_in: 0 }))
        }}
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
