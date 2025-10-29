import { useRef, useState } from 'react'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import InputWithLabel from '../common/InputWithLabel'
import Modal from '../common/Modal'
import { phoneFormat } from '../../utils/phoneFormat'
import type { UserProfileData } from '../../types/userType'
import { showToast } from '../../utils/showToast'

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
  const [tempData, setTempData] = useState<UserProfileData>(profileData) //모달에서 수정 중인 프로필 데이터
  const [showVerificationInput, setShowVerificationInput] = useState(false) // 휴대폰 인증번호 입력창 표시 여부
  const [verificationCode, setVerificationCode] = useState('') // 인증번호
  const [isVerified, setIsVerified] = useState(false) //인증번호 확인 완료 여부
  const [previewImage, setPreviewImage] = useState<string | null>(null) //선택한 이미지의 미리보기 url (FileReader로 생성한 base64)
  const [_selectedFile, setSelectedFile] = useState<File | null>(null) // 선택한 이미지 파일 객체
  const fileInputRef = useRef<HTMLInputElement>(null) // 숨겨진 file input 요소에 접근하기 위한 ref

  const DUMMY_VERIFICATION_CODE = '123456'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const formattedValue = name === 'phone' ? phoneFormat(value) : value

    setTempData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))
  }

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // 이미지 파일만 허용
    const imageMimeType = /image\/(png|jpg|jpeg|webp)/i
    if (!file.type.match(imageMimeType)) {
      showToast(
        '이미지 파일만 업로드 가능합니다 (png, jpg, jpeg, webp)',
        'error',
        '업로드 실패'
      )
      return
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      showToast('파일 크기는 5MB 이하여야 합니다', 'error', '업로드 실패')
      return
    }

    setSelectedFile(file)

    // FileReader로 미리보기 생성
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreviewImage(result)
    }
    reader.readAsDataURL(file)
  }

  // 프로필 사진 변경 버튼 클릭
  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleSave = async () => {
    // 나중에 api 연결할떄 여기서 S3 presigned URL 받아서 업로드
    // 현재는 미리보기 이미지를 그대로 사용 (로컬 blob URL)
    if (previewImage) {
      tempData.profile_image_url = previewImage
    }

    onSave(tempData)
    setShowVerificationInput(false)
    setVerificationCode('')
    setPreviewImage(null)
    setSelectedFile(null)
  }

  const handleCancel = () => {
    setTempData(profileData)
    setShowVerificationInput(false)
    setVerificationCode('')
    setIsVerified(false)
    setPreviewImage(null)
    setSelectedFile(null)
    onClose()
  }

  const handleVerificationClick = () => {
    setShowVerificationInput(true)
    showToast('인증 번호가 전송되었습니다', 'success', '인증번호 전송')
  }

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // 숫자만 허용

    if (value.length <= 6) setVerificationCode(value)
  }

  const handleVerificationConfirm = () => {
    if (verificationCode === DUMMY_VERIFICATION_CODE) {
      setIsVerified(true)
      showToast('인증이 완료되었습니다', 'success', '인증 완료')
    } else {
      showToast('인증 번호를 확인하세요', 'error', '인증 실패')
    }
  }

  // 변경하기 버튼 비활성화 (인증 입력창이 보이지만 인증이 완료되지 않은 경우)
  const isSaveDisabled = showVerificationInput && !isVerified

  // 표시할 이미지: 미리보기 > 기존 프로필 이미지
  const displayImage = previewImage || tempData.profile_image_url

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
          <Avatar name={tempData.name} size="xl" imgUrl={displayImage} />
          <button
            type="button"
            onClick={handleProfileImageClick}
            className="text-primary-600 hover:text-primary-700 cursor-pointer text-sm transition-colors"
          >
            프로필 사진 변경
          </button>
          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
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
