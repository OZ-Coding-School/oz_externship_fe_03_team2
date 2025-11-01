import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import InputWithLabel from '../common/InputWithLabel'
import { showToast } from '../../utils/showToast'
import { useChangePassword } from '../../api/services/mypage/profile'
import { validatePasswordChangeField } from '../../utils/passwordValidation'
import type { AxiosError } from 'axios'
import type { PasswordChangeErrorResponse } from '../../types/apiInterface/mypageInterface'
import {
  INIT_FORM_DATA,
  INIT_ERRORS,
} from '../../constants/profilepasswordChange'

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const [formData, setFormData] = useState(INIT_FORM_DATA)

  const [errors, setErrors] = useState(INIT_ERRORS)

  // 비밀번호 변경 api 훅
  const { mutate: changePassword, isPending } = useChangePassword()

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }))
      }
    }

  // 각 필드 유효성 검사
  const validateFormField = (field: keyof typeof formData) => {
    const { isValid, errorMessage } = validatePasswordChangeField(
      field,
      formData[field],
      formData
    )

    if (!isValid) setErrors((prev) => ({ ...prev, [field]: errorMessage }))
    else setErrors((prev) => ({ ...prev, [field]: '' }))

    return isValid
  }

  const handleSave = () => {
    const isCurrentValid = validateFormField('currentPassword')
    const isNewValid = validateFormField('newPassword')
    const isConfirmValid = validateFormField('confirmPassword')

    if (!isCurrentValid || !isNewValid || !isConfirmValid) return

    // api 호출
    changePassword(
      {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirm: formData.confirmPassword,
      },
      {
        onSuccess: (data) => {
          showToast(data.detail, 'success', '비밀번호 변경 완료')
          handleCancel()
        },

        onError: (error: Error) => {
          const axiosError = error as AxiosError<PasswordChangeErrorResponse>
          const errorMessage =
            axiosError?.response?.data.error ?? '비밀번호 변경에 실패했습니다' // error 필드에서 메시지 추출

          // 현재 비밀번호 오류 감지해서 에러메세지
          if (errorMessage.includes('현재 비밀번호')) {
            setErrors((prev) => ({
              ...prev,
              currentPassword: errorMessage,
            }))
            showToast(errorMessage, 'error', '비밀번호 오류')
          } else {
            showToast(errorMessage, 'error', '비밀번호 변경 실패')
          }
        },
      }
    )
  }

  const handleCancel = () => {
    setFormData(INIT_FORM_DATA)
    setErrors(INIT_ERRORS)
    onClose()
  }

  // 모든 필드가 입력되었는지 확인
  const isCheckField =
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword

  return (
    <Modal
      title="비밀번호 변경"
      isOpen={isOpen}
      onClose={handleCancel}
      footer={
        <>
          <Button variant="outline" size="md" onClick={handleCancel}>
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={isCheckField || isPending}
          >
            {isPending ? '변경 중...' : '변경하기'}
          </Button>
        </>
      }
    >
      <div className="w-full space-y-4">
        {/* 현재 비밀번호 */}
        <InputWithLabel
          label="현재 비밀번호"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange('currentPassword')}
          onBlur={() => validateFormField('currentPassword')}
          placeholder="현재 비밀번호를 입력하세요"
          error={errors.currentPassword}
          required
          disabled={isPending}
        />

        {/* 새 비밀번호 */}
        <InputWithLabel
          label="새 비밀번호"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange('newPassword')}
          onBlur={() => validateFormField('newPassword')}
          placeholder="새 비밀번호를 입력하세요 (8자 이상)"
          error={errors.newPassword}
          required
          disabled={isPending}
        />

        {/* 새비밀번호 확인 */}
        <InputWithLabel
          label="새 비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          onBlur={() => validateFormField('confirmPassword')}
          placeholder="새 비밀번호를 다시 입력하세요"
          error={errors.confirmPassword}
          required
          disabled={isPending}
        />
      </div>
    </Modal>
  )
}

export default PasswordChangeModal
