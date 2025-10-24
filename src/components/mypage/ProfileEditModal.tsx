import { useState } from 'react'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import InputWithLabel from '../common/InputWithLabel'
import Modal from '../common/Modal'
import { phoneFormat } from '../../utils/phoneFormat'
import { toast } from 'sonner'
import Toast from '../common/toast/Toast'
import type { UserProfileData } from '../../types/userType'

interface ProfileEditModalProps {
  isOpen: boolean
  profileData: UserProfileData
  onClose: () => void
  onSave: (data: UserProfileData) => void
}

function ProfileEditModal({
  isOpen,
  profileData,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const [tempData, setTempData] = useState<UserProfileData>(profileData)
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const DUMMY_VERIFICATION_CODE = '123456'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const formattedValue = name === 'phone' ? phoneFormat(value) : value

    setTempData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))
  }

  const handleSave = () => {
    onSave(tempData)
    setShowVerificationInput(false)
    setVerificationCode('')
  }

  const handleCancel = () => {
    setTempData(profileData)
    setShowVerificationInput(false)
    setVerificationCode('')
    setIsVerified(false)
    onClose()
  }

  const handleVerificationClick = () => {
    setShowVerificationInput(true)

    toast.custom((t) => (
      <Toast
        id={t}
        title="인증번호 전송"
        message="인증 번호가 전송되었습니다"
        type="success"
      />
    ))
  }

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // 숫자만 허용

    if (value.length <= 6) setVerificationCode(value)
  }

  const handleVerificationConfirm = () => {
    if (verificationCode === DUMMY_VERIFICATION_CODE) {
      setIsVerified(true)
      toast.custom((t) => (
        <Toast
          id={t}
          title="인증 완료"
          message="인증이 완료되었습니다"
          type="success"
        />
      ))
    } else {
      toast.custom((t) => (
        <Toast
          id={t}
          title="인증 실패"
          message="인증 번호를 확인하세요"
          type="error"
        />
      ))
    }
  }

  // 변경하기 버튼 비활성화 (인증 입력창이 보이지만 인증이 완료되지 않은 경우)
  const isSaveDisabled = showVerificationInput && !isVerified

  return (
    <Modal
      title="프로필 수정"
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
            disabled={isSaveDisabled}
          >
            변경하기
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-2">
          <Avatar name={tempData.name} size="xl" />
          <p className="text-primary-600 hover:text-primary-700 cursor-pointer text-sm">
            프로필 사진 변경
          </p>
        </div>

        {/* 입력 필드들 */}
        <div className="w-full space-y-4">
          {/* 닉네임 */}
          <InputWithLabel
            label="닉네임"
            name="nickname"
            value={tempData.nickname}
            onChange={handleInputChange}
            placeholder="닉네임을 입력하세요"
            required
            button={{
              label: '중복확인',
              variant: 'secondary',
              onClick: handleVerificationClick,
            }}
          />

          {/* 휴대폰 번호 */}
          <InputWithLabel
            label="휴대폰 번호"
            name="phone"
            value={tempData.phone_number}
            onChange={handleInputChange}
            placeholder="휴대폰 번호를 입력하세요"
            button={{
              label: '인증하기',
              onClick: handleVerificationClick,
              variant: 'secondary',
              countdown: 180,
            }}
          />

          {/* 인증번호 입력 (조건부렌더) */}
          {showVerificationInput && (
            <InputWithLabel
              name="verificationCode"
              value={verificationCode}
              onChange={handleVerificationChange}
              placeholder="인증번호 6자리 입력"
              maxLength={6}
              button={{
                label: '확인',
                onClick: handleVerificationConfirm,
                variant: 'primary',
                disabled: verificationCode.length !== 6,
              }}
            />
          )}
          {/* 인증 완료 메시지 */}
          {isVerified && (
            <div className="text-success-500 rounded-md bg-green-50 px-4 py-2 text-sm">
              인증이 완료되었습니다
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ProfileEditModal
