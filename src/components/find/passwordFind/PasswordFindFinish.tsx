import { useNavigate } from 'react-router'
import { Key } from 'lucide-react'
import InputWithLabel from '../../common/InputWithLabel'
import type { PasswordFormData } from '../../../pages/PasswordFindPage'
import useDebounce from '../../../hooks/useDebounce'
import { useRecoveryPassword } from '../../../api/services/find/passwordFind'
import { showToast } from '../../../utils/showToast'

interface PasswordFinishFormProps {
  formData: PasswordFormData
  setFormData: React.Dispatch<React.SetStateAction<PasswordFormData>>
}

export default function PasswordFindFinish({
  formData,
  setFormData,
}: PasswordFinishFormProps) {
  const navigate = useNavigate()
  const { mutate } = useRecoveryPassword()
  const handleSubmit = () => {
    if (!formData.password || !formData.passwordConfirm) {
      showToast(
        '비밀번호가 누락되었습니다. 확인 후 다시 시도해주세요.',
        'warning',
        '주의가 필요합니다'
      )
      return
    }
    mutate(
      {
        body: {
          email: formData.email,
          new_password: formData.password,
          new_password_confirm: formData.passwordConfirm,
        },
        verifyToken: formData.verify_token,
      },
      {
        onSuccess: () => navigate('/login'),
      }
    )
  }

  const debouncedPassword = useDebounce(formData.password)
  const passwordReg =
    debouncedPassword === ''
      ? true
      : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
          debouncedPassword
        )
  const passwordError = passwordReg ? '' : '비밀번호 강도가 약합니다.'

  const passwordConfirmTest = useDebounce(formData.passwordConfirm)
  const passwordConfirmError =
    passwordConfirmTest === ''
      ? ''
      : passwordConfirmTest !== formData.password
        ? '비밀번호가 일치하지 않습니다.'
        : ''

  return (
    <div className="flex w-full max-w-[23rem] flex-col gap-[1.5rem] pb-[1.5rem]">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-success-100 text-success-600 flex h-[4rem] w-[4rem] rotate-[45deg] items-center justify-center rounded-full">
          <Key size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.125rem] font-semibold">비밀번호 재설정</p>
          <p className="text-[.875rem] text-gray-600">
            새로운 비밀번호를 입력해주세요
          </p>
        </div>
      </div>
      <InputWithLabel
        label="새 비밀번호"
        type="password"
        name="password"
        value={formData.password}
        placeholder="8자 이상 입력해주세요"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value.trim() }))
        }
        error={passwordError}
      />
      <InputWithLabel
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        placeholder="새 비밀번호를 다시 입력해주세요"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            passwordConfirm: e.target.value.trim(),
          }))
        }
        error={passwordConfirmError}
      />

      <div className="flex gap-2">
        <button
          onClick={() => {
            handleSubmit()
          }}
          className="bg-success-500 h-12 w-full rounded-lg text-white"
        >
          비밀번호 변경 완료
        </button>
      </div>
    </div>
  )
}
