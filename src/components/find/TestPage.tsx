import { useState } from 'react'

import PhoneAuthentication from './emailFind/PhoneAuthentication'
import Stepper from './Stepper'
import EmailFindFinish from './emailFind/EmailFindFinish'
import UserProfileForm from './emailFind/UserProfileForm'

export interface FormData {
  name: string
  phone: string
  authCode: string
}

export default function TestPage() {
  const [level, setLevel] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    authCode: '',
  })

  const handleNextStep = () => setLevel((prev) => prev + 1)
  const handlePrevStep = () => setLevel((prev) => prev - 1)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-[2rem]">
      <div className="flex flex-col items-center gap-[.5rem]">
        <p className="text-[1.875rem] font-semibold">이메일 찾기</p>
        <p className="text-[.875rem]">
          가입 시 입력한 정보로 이메일을 찾을 수 있습니다
        </p>
      </div>
      <div className="shadow-normal flex w-[28rem] flex-col justify-center gap-[1.5rem] rounded-lg px-[2.5rem] pt-[2rem] pb-[.75rem]">
        <Stepper level={level} />

        {level === 1 ? (
          <UserProfileForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        ) : level === 2 ? (
          <PhoneAuthentication
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        ) : (
          <EmailFindFinish />
        )}
      </div>
    </div>
  )
}
