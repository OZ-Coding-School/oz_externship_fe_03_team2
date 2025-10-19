import { useState } from 'react'
import Stepper from '../components/find/Stepper'
import EmailAuthentication from '../components/find/passwordFind/EmailAuthentication'
import PasswordFindFinish from '../components/find/passwordFind/PasswordFindFinish'
import PasswordFindEmailForm from '../components/find/passwordFind/PasswordFindEmailForm'

export interface PasswordFormData {
  email: string
  authCode: string
  password: string
}

export default function PasswordFindPage() {
  const [level, setLevel] = useState(1)
  const [formData, setFormData] = useState<PasswordFormData>({
    email: '',
    authCode: '',
    password: '',
  })

  const handleNextStep = () => setLevel((prev) => prev + 1)
  const handlePrevStep = () => setLevel((prev) => prev - 1)

  return (
    <div className="min-h-screen py-25">
      <div className="m-5 flex flex-col items-center justify-center gap-[2rem] [word-break:keep-all]">
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.875rem] font-semibold">비밀번호 찾기</p>
          <p className="text-[.875rem]">
            가입한 이메일로 비밀번호를 재설정할 수 있습니다
          </p>
        </div>
        <div className="shadow-normal flex w-full max-w-[28rem] flex-col justify-center gap-[1.5rem] rounded-lg px-[2.5rem] pt-[2rem] pb-[.75rem]">
          <Stepper
            level={level}
            descriptionOne="이메일입력"
            descriptionTwo="이메일인증"
            descriptionThree="비밀번호재설정"
          />

          {level === 1 ? (
            <PasswordFindEmailForm
              formData={formData}
              setFormData={setFormData}
              onNext={handleNextStep}
            />
          ) : level === 2 ? (
            <EmailAuthentication
              formData={formData}
              setFormData={setFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          ) : (
            <PasswordFindFinish />
          )}
        </div>
      </div>
    </div>
  )
}
