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
        onSuccess: () => {
          setFormData(
            (prev) => ({ ...prev, verify_token: formData.verify_token })
            // onNext()
          )
        },
      }
      // 실제 api 연결 시 위에 주석 해제, 아래 코드 삭제
    )
    onNext()
  }

  const handleAuthCode = () => {
    codeResendMutate({ phone_number: formData.phone })
  }

  const authReg = /^[0-9]{4}$/.test(formData.code)

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

      <div className="flex flex-row items-end gap-2">
        <div className="w-full min-w-5 overflow-hidden">
          <InputWithLabel
            label="인증코드"
            name="authCode"
            value={formData.code}
            placeholder="4자리 인증코드 입력"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, code: e.target.value }))
            }
          />
        </div>
        <button
          onClick={() => handleAuthCode()}
          className="bg-primary-100 hover:bg-primary-200 active:bg-primary-300 flex h-10 w-[7rem] items-center justify-center rounded-md px-[1.5rem] py-[1.25rem] whitespace-nowrap text-[#EAB308]"
        >
          재전송
        </button>
      </div>

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
