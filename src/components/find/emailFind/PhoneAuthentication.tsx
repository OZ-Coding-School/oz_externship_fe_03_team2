import { toast } from 'sonner'
import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import type { FormData } from '../TestPage'
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
    if (!formData.name || !formData.phone) {
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
  return (
    <div>
      <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
        <Phone size={30} />
      </div>
      <h2>휴대폰 인증</h2>
      <p>{formData.phone}로 인증코드를 발송했습니다</p>

      <InputWithLabel
        label="인증코드"
        name="authCode"
        value={formData.authCode}
        placeholder="4자리 인증코드 입력"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, authCode: e.target.value }))
        }
      />
      <button>인증코드 전송</button>

      <Button variant="primary" size="freeWidthLg" onClick={handleSubmit}>
        인증하기
      </Button>
      <Button variant="outline" size="freeWidthMd" onClick={onPrev}>
        이전 단계
      </Button>
    </div>
  )
}
