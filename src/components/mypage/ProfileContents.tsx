import { useState } from 'react'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import ProfileEditModal from './ProfileEditModal'
import { PROFILE_FIELDS } from '../../constants/myPageProfile'
import PasswordChangeModal from './PasswordChangeModal'
import UserLeaveModal from './UserLeaveModal'
import { birthdayFormat } from '../../utils/dateFormat'
import { phoneFormat } from '../../utils/phoneFormat'
import { useUserStore, type UserType } from '../../store/useUserStore'

function ProfileContents() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

  // zustand store에서 user 정보 가져오기
  const user = useUserStore((state) => state.user)

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const formatFieldValue = (fieldKey: string, value: unknown): string => {
    switch (fieldKey) {
      case 'birthday':
        return value && typeof value === 'string' ? birthdayFormat(value) : '-'
      case 'phone_number':
        return value && typeof value === 'string' ? phoneFormat(value) : '-'
      default:
        return value ? String(value) : '-'
    }
  }

  if (!user) return null

  return (
    <div className="w-full rounded-lg bg-white">
      {/* 상단 헤더 */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">내 정보</h2>
            <p className="mt-1 text-sm text-gray-600">
              회원 정보를 확인하고 수정할 수 있습니다
            </p>
          </div>
          <Button variant="primary" size="md" onClick={handleEditClick}>
            수정하기
          </Button>
        </div>
      </div>

      {/* 프로필 이미지 */}
      <div className="border-b border-gray-200 px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar
            name={user.name ?? user.nickname}
            size="2xl"
            imgUrl={user.profile_img_url}
          />
          <p className="text-center text-lg font-semibold text-gray-900">
            프로필 이미지
          </p>
        </div>
      </div>

      {/* 정보 섹션 */}
      <div className="px-8 py-8">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {PROFILE_FIELDS.map((field) => (
            <div key={field.key} className="w-full md:w-[calc(50%-1rem)]">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="rounded-md bg-gray-50 px-4 py-2.5 text-gray-900">
                {formatFieldValue(field.key, user[field.key as keyof UserType])}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 비밀번호 변경 섹션 */}
      <div className="border-t border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">비밀번호 변경</h3>
            <p className="mt-1 text-sm text-gray-600">
              보안을 위해 정기적으로 비밀번호를 변경해주세요
            </p>
          </div>
          <Button
            variant="gray"
            size="md"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <div className="border-t border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">회원 탈퇴</h3>
            <p className="mt-1 text-sm text-gray-600">
              계정을 삭제하고 서비스를 떠나실 수 있습니다
              <span className="text-primary-600 ml-4">
                탈퇴 후 2주간 계정 복구가 가능합니다
              </span>
            </p>
          </div>
          <Button
            variant="danger"
            size="md"
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            회원 탈퇴
          </Button>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        isOpen={isModalOpen}
        profileData={user}
        onClose={handleCancel}
      />

      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* 회원탈퇴 모달 */}
      <UserLeaveModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
      />
    </div>
  )
}

export default ProfileContents
