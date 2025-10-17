import { toast } from 'sonner'
import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import type { FormData } from '../../../pages/EmailFindPage'
import Toast from '../../common/toast/Toast'
import { Phone } from 'lucide-react'

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
  const handleSubmit = () => {
    if (!formData.authCode) {
      toast.custom((t) => (
        <Toast
          id={t}
          title="주의가 필요합니다"
          message="인증번호가 누락되었습니다. 확인 후 다시 시도해주세요."
          type="warning"
        />
      ))
      return
    }
    onNext()
  }

  const authReg = /^[0-9]{4}$/.test(formData.authCode)

  return (
    <div className="flex w-[23rem] flex-col gap-[1.5rem] pb-[1.5rem]">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <Phone size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.125rem] font-semibold">휴대폰 인증</p>
          <p className="text-[.875rem]">
            {formData.phone}로 인증코드를 발송했습니다.
          </p>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="w-[15.5625rem]">
          <InputWithLabel
            label="인증코드"
            name="authCode"
            value={formData.authCode}
            placeholder="4자리 인증코드 입력"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authCode: e.target.value }))
            }
          />
        </div>
        <button className="bg-primary-100 hover:bg-primary-200 active:bg-primary-300 flex h-[2.625rem] w-[7rem] items-center justify-center rounded-md px-[1.5rem] py-[1.25rem] whitespace-nowrap text-[#EAB308]">
          인증코드전송
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
