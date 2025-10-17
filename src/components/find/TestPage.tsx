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
    <div className="flex w-[28rem] flex-col justify-center gap-[1.5rem] rounded-lg px-[2.5rem] pt-[2rem] pb-[.75rem] shadow-md">
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
  )
}
