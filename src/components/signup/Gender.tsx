import React from 'react'
import type { Form } from '../../pages/SignUpPage'

interface GenderProps {
  form: Form
  setForm: React.Dispatch<React.SetStateAction<Form>>
  error: Record<string, string>
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

function Gender({ form, setForm, error, setError }: GenderProps) {
  const handleGenderSelect = (value: 'M' | 'F') => {
    setForm((prev) => ({ ...prev, gender: value }))
    if (error.gender) {
      setError((prev) => ({ ...prev, gender: '' }))
    }
  }
  return (
    <>
      <div>
        성별
        <span className="text-danger-500">*</span>
      </div>
      <div className="flex gap-5">
        <button
          type="button"
          className={`${form.gender === 'M' ? 'bg-primary-100 text-primary-600 border-primary-600' : 'border-gray-300 bg-gray-200 text-gray-700'} cursor-pointer items-center justify-center rounded-full border px-[2.0625rem] py-[.5625rem]`}
          onClick={() => handleGenderSelect('M')}
        >
          남
        </button>
        <button
          type="button"
          value={'female'}
          className={`${form.gender === 'F' ? 'bg-primary-100 text-primary-600 border-primary-600' : 'border-gray-300 bg-gray-200 text-gray-700'} cursor-pointer items-center justify-center rounded-full border px-[2.0625rem] py-[.5625rem]`}
          onClick={() => handleGenderSelect('F')}
        >
          여
        </button>
      </div>
      {error && (
        <p className="text-danger-500 mt-1 text-sm">{error['gender']}</p>
      )}
    </>
  )
}

export default Gender
