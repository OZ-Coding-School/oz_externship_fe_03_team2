import { useState } from 'react'

import PhoneAuthentication from '../components/find/emailFind/PhoneAuthentication'
import Stepper from '../components/find/Stepper'
import EmailFindFinish from '../components/find/emailFind/EmailFindFinish'
import UserProfileForm from '../components/find/emailFind/UserProfileForm'

export interface FormData {
  name: string
  phone: string
  code: string
  request_id: string
  verify_token: string
}

export default function EmailFindPage() {
  const [level, setLevel] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    code: '',
    request_id: '',
    verify_token: '',
  })

  const handleNextStep = () => setLevel((prev) => prev + 1)
  const handlePrevStep = () => setLevel((prev) => prev - 1)

  return (
    <div className="min-h-screen py-25">
      <div className="m-5 flex flex-col items-center justify-center gap-[2rem] [word-break:keep-all]">
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.875rem] font-semibold">이메일 찾기</p>
          <p className="text-[.875rem]">
            가입 시 입력한 정보로 이메일을 찾을 수 있습니다
          </p>
        </div>
        <div className="shadow-normal flex w-full max-w-[28rem] flex-col justify-center gap-[1.5rem] rounded-lg px-[2.5rem] pt-[2rem] pb-[.75rem]">
          <Stepper
            level={level}
            descriptionOne="정보입력"
            descriptionTwo="휴대폰인증"
            descriptionThree="결과확인"
          />

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
            <EmailFindFinish formData={formData} />
          )}
        </div>
      </div>
    </div>
  )
}
