import { useCallback, useEffect, useRef, useState } from 'react'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import InputWithLabel from '../common/InputWithLabel'
import Modal from '../common/Modal'
import {
  isValidPhoneNumber,
  phoneFormat,
  removePhoneFormat,
} from '../../utils/phoneFormat'
import { showToast } from '../../utils/showToast'
import type { UserType } from '../../store/useUserStore'
import { useNickNameConfirm } from '../../api/services/Auth'
import type { AxiosError } from 'axios'
import {
  useConfirmPhoneVerificationCode,
  useSendPhoneVerificationCode,
  useUpdateProfile,
} from '../../api/services/mypage/profile'
import type { UpdateMeRequest } from '../../types/apiInterface/mypageInterface'
import {
  INIT_NICKNAME_CHECK,
  INITL_VERIFICATION,
} from '../../constants/profileEditModal'

interface ProfileEditModalProps {
  isOpen: boolean
  profileData: UserType
  onClose: () => void
}

function ProfileEditModal({
  isOpen,
  profileData,
  onClose,
}: ProfileEditModalProps) {
  const [tempData, setTempData] = useState<UserType>(profileData) //모달에서 수정 중인 프로필 데이터

  const [verification, setVerification] = useState(INITL_VERIFICATION)
  const [nickname, setNickname] = useState(INIT_NICKNAME_CHECK)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [_selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 휴대폰 인증 api 훅
  const { mutate: sendVerificationCode, isPending: isSendingCode } =
    useSendPhoneVerificationCode()
  const { mutate: confirmVerificationCode, isPending: isConfirmingCode } =
    useConfirmPhoneVerificationCode()
  const {
    isLoading: isNicknameLoading,
    error: nicknameError,
    isSuccess: isNicknameSuccess,
    isError: isNicknameError,
  } = useNickNameConfirm(tempData.nickname || '', nickname.needsCheck)

  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const resetState = useCallback(() => {
    setTempData({
      ...profileData,
      phone_number: phoneFormat(profileData.phone_number || ''),
    })
    setVerification(INITL_VERIFICATION)
    setNickname(INIT_NICKNAME_CHECK)
    setPreviewImage(null)
    setSelectedFile(null)
  }, [profileData])

  // 모달이 열릴 때마다 상태 초기화
  useEffect(() => {
    if (isOpen) resetState()
  }, [isOpen, resetState])

  // 변경 핸들러 조기 반환 패턴
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = name === 'phone_number' ? phoneFormat(value) : value

    setTempData((prev) => ({ ...prev, [name]: formattedValue }))

    // 닉네임 변경시 체크 상태 초기화
    if (name === 'nickname' && nickname.completed) {
      setNickname(INIT_NICKNAME_CHECK)
    }

    // 전화번호 변경시 인증 상태 초기화
    if (name === 'phone_number' && verification.showInput) {
      setVerification(INITL_VERIFICATION)
    }
  }

  // 닉네임 중복확인
  useEffect(() => {
    if (!nickname.needsCheck) return

    if (isNicknameSuccess) {
      setNickname({ needsCheck: false, completed: true, isUse: true })
      showToast('사용 가능한 닉네임입니다', 'success', '사용 가능')
    } else if (isNicknameError) {
      const status = (nicknameError as AxiosError)?.response?.status
      setNickname({ needsCheck: false, completed: true, isUse: false })
      const message =
        status === 409
          ? '이미 사용 중인 닉네임입니다'
          : '중복확인에 실패했습니다'
      showToast(message, 'error', status === 409 ? '사용 불가' : '오류 발생')
    }
  }, [isNicknameSuccess, isNicknameError, nickname.needsCheck, nicknameError])

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

  // 휴대폰 인증 처리
  const handleVerificationSend = () => {
    const phoneNumber = tempData.phone_number?.trim()

    if (!phoneNumber) {
      showToast('휴대폰 번호를 입력해주세요', 'error', '입력 오류')
      return
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      showToast(
        '올바른 휴대폰 번호를 입력해주세요 (010-XXXX-XXXX)',
        'error',
        '입력 오류'
      )
      return
    }

    sendVerificationCode(
      { phone_number: removePhoneFormat(phoneNumber) },
      {
        onSuccess: (res) => {
          setVerification((prev) => ({
            ...prev,
            requestId: res.request_id,
            showInput: true,
          }))
          showToast('인증 번호가 전송되었습니다', 'success', '인증번호 전송')
        },
        onError: () => {
          setVerification(INITL_VERIFICATION)
          showToast('인증 번호 전송에 실패했습니다', 'error', '전송 실패')
        },
      }
    )
  }

  const handleVerificationConfirm = () => {
    if (!verification.requestId) {
      showToast('인증 요청이 유효하지 않습니다', 'error', '오류')
      return
    }

    if (!tempData.phone_number) {
      showToast('휴대폰 번호가 없습니다', 'error', '오류')
      return
    }

    confirmVerificationCode(
      {
        phone_number: removePhoneFormat(tempData.phone_number),
        request_id: verification.requestId,
        code: verification.code,
      },
      {
        onSuccess: (response) => {
          // verify_token을 응답에서 받아 저장
          setVerification((prev) => ({
            ...prev,
            isVerified: true,
            verifyToken: response.verify_token || '', // 토큰 저장
            errorMessage: '',
          }))
          showToast('인증이 완료되었습니다', 'success', '인증 완료')
        },
        onError: () => {
          const errorMessage = '인증 번호가 일치하지 않습니다'

          setVerification((prev) => ({
            ...prev,
            errorMessage, //에러메시지 저장
          }))
          showToast('인증 번호를 확인하세요', 'error', '인증 실패')
        },
      }
    )
  }

  // 프로필 사진 변경 버튼 클릭
  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleSave = () => {
    const isNicknameChanged = tempData.nickname !== profileData.nickname
    const isPhoneNumberChanged =
      removePhoneFormat(tempData.phone_number || '') !==
      removePhoneFormat(profileData.phone_number || '')
    const isImageChanged = previewImage !== null

    // 변경사항이 없으면 종료
    if (!isNicknameChanged && !isPhoneNumberChanged && !isImageChanged) {
      showToast('변경된 내용이 없습니다', 'error', '입력 오류')
      return
    }

    // 닉네임 변경했는데 중복확인 안함
    if (isNicknameChanged && !nickname.completed) {
      showToast('닉네임 중복확인을 해주세요', 'error', '확인 필요')
      return
    }

    // 닉네임이 이미 사용중
    if (isNicknameChanged && !nickname.isUse) {
      showToast('사용 불가능한 닉네임입니다', 'error', '재선택 필요')
      return
    }

    // 전화번호 변경했는데 인증 안함
    if (isPhoneNumberChanged && !verification.isVerified) {
      showToast('휴대폰 인증을 완료해주세요', 'error', '인증 필요')
      return
    }

    //  변경된 필드만 요청에 포함 (백엔드에서 포함된 필드만 업데이트)
    const updateData: UpdateMeRequest = {
      profile_img_url: previewImage || tempData.profile_img_url,
    }

    // 닉네임이 변경되었을 때만 포함
    if (isNicknameChanged) {
      updateData.nickname = tempData.nickname
    }

    // 전화번호가 변경되었을때만 포함
    if (isPhoneNumberChanged) {
      updateData.phone_number = removePhoneFormat(tempData.phone_number || '')
      updateData.verify_token = verification.verifyToken
    }

    // api 호출
    updateProfile(updateData, {
      onSuccess: () => {
        showToast('프로필이 업데이트되었습니다', 'success', '저장 완료')
        resetState()
        onClose()
      },
      onError: () => {
        showToast('프로필 업데이트 실패', 'error', '저장 실패')
      },
    })
  }

  const handleCancel = () => {
    resetState()
    onClose()
  }

  // 표시할 이미지: 미리보기 > 기존 프로필 이미지
  const displayImage = previewImage || tempData.profile_img_url

  const isPhoneValid = tempData.phone_number
    ? isValidPhoneNumber(tempData.phone_number)
    : false
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
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '변경하기'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-2">
          <Avatar
            name={tempData.name ?? tempData.nickname}
            size="xl"
            imgUrl={displayImage}
          />
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
          <div>
            <InputWithLabel
              label="닉네임"
              name="nickname"
              value={tempData.nickname || ''}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
              required
              button={{
                label: isNicknameLoading ? '확인중...' : '중복확인',
                variant: 'secondary',
                onClick: () => {
                  if (!tempData.nickname?.trim()) {
                    showToast('닉네임을 입력해주세요', 'error', '입력 오류')
                    return
                  }
                  setNickname((prev) => ({ ...prev, needsCheck: true }))
                },
                disabled: isNicknameLoading,
              }}
            />
            {/* 닉네임 확인 상태 메시지 */}
            {nickname.completed && nickname.isUse && (
              <div className="text-success-500 mt-1 px-4 py-2 text-sm font-semibold">
                사용 가능한 닉네임입니다
              </div>
            )}
            {nickname.completed && !nickname.isUse && (
              <div className="text-danger-600 mt-1 px-4 py-2 text-sm font-semibold">
                이미 사용 중인 닉네임입니다
              </div>
            )}
          </div>

          {/* 휴대폰 번호 */}
          <InputWithLabel
            label="휴대폰 번호"
            name="phone_number"
            value={tempData.phone_number}
            onChange={handleInputChange}
            placeholder="휴대폰 번호를 입력하세요"
            disabled={verification.isVerified} // 인증 완료되면 비활성화
            button={{
              label: isSendingCode ? '전송중...' : '인증하기',
              onClick: handleVerificationSend,
              variant: 'secondary',
              countdown: verification.showInput ? 180 : undefined,
              disabled: isSendingCode || !isPhoneValid,
            }}
          />

          {/* 인증번호 입력 (조건부렌더) */}
          {verification.showInput && (
            <InputWithLabel
              name="verificationCode"
              value={verification.code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                setVerification((prev) => ({ ...prev, code: value }))
              }}
              placeholder="인증번호 6자리 입력"
              maxLength={6}
              button={{
                label: isConfirmingCode ? '확인중...' : '확인',
                onClick: handleVerificationConfirm,
                variant: 'primary',
                disabled: verification.code.length !== 6 || isConfirmingCode,
              }}
            />
          )}
          {/* 에러 메시지 표시 */}
          {verification.errorMessage && (
            <div className="text-danger-500 mt-1 px-4 py-2 text-sm font-semibold">
              {verification.errorMessage}
            </div>
          )}

          {/* 인증 완료 메시지 */}
          {verification.isVerified && (
            <div className="text-success-500 mt-1 px-4 py-2 text-sm font-semibold">
              인증이 완료되었습니다
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ProfileEditModal
