import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import InputWithLabel from '../common/InputWithLabel'
import { toast } from 'sonner'
import Toast from '../common/toast/Toast'

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

// 폼데이터 초기값
const INIT_FORM_DATA = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

// 에러 초기값
const INIT_ERRORS = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const [formData, setFormData] = useState(INIT_FORM_DATA)

  const [errors, setErrors] = useState(INIT_ERRORS)

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }))
      }
    }

  const validateCurrentPassword = () => {
    if (!formData.currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: '현재 비밀번호를 입력하세요',
      }))
      return false
    }

    setErrors((prev) => ({ ...prev, currentPassword: '' }))
    return true
  }

  const validateNewPassword = () => {
    if (!formData.newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: '새 비밀번호를 입력하세요',
      }))
      return false
    }
    if (formData.newPassword.length < 8) {
      setErrors((prev) => ({
        ...prev,
        newPassword: '비밀번호는 8자 이상이어야 합니다',
      }))
      return false
    }
    setErrors((prev) => ({ ...prev, newPassword: '' }))
    return true
  }

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호 확인을 입력하세요',
      }))
      return false
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '새 비밀번호가 일치하지 않습니다',
      }))
      return false
    }
    setErrors((prev) => ({ ...prev, confirmPassword: '' }))
    return true
  }

  const handleSave = () => {
    const isCurrentValid = validateCurrentPassword()
    const isNewValid = validateNewPassword()
    const isConfirmValid = validateConfirmPassword()

    if (!isCurrentValid || !isNewValid || !isConfirmValid) return

    // 성공
    toast.custom((t) => (
      <Toast
        id={t}
        title="비밀번호 변경 완료"
        message="비밀번호가 성공적으로 변경되었습니다"
        type="success"
      />
    ))

    handleCancel()
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
            disabled={isCheckField}
          >
            변경하기
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
          onBlur={validateCurrentPassword}
          placeholder="현재 비밀번호를 입력하세요"
          error={errors.currentPassword}
          required
        />

        {/* 새 비밀번호 */}
        <InputWithLabel
          label="새 비밀번호"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange('newPassword')}
          onBlur={validateNewPassword}
          placeholder="새 비밀번호를 입력하세요 (8자 이상)"
          error={errors.newPassword}
          required
        />

        {/* 새비밀번호 확인 */}
        <InputWithLabel
          label="새 비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          onBlur={validateConfirmPassword}
          placeholder="새 비밀번호를 다시 입력하세요"
          error={errors.confirmPassword}
          required
        />
      </div>
    </Modal>
  )
}

export default PasswordChangeModal
