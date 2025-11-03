import { useState } from 'react'
import Avatar from '../../common/Avatar'
import Button from '../../common/Button'
import ProfileEditModal from '../ProfileEditModal'
import PasswordChangeModal from '../PasswordChangeModal'
import UserLeaveModal from '../UserLeaveModal'
import { birthdayFormat } from '../../../utils/dateFormat'
import { phoneFormat } from '../../../utils/phoneFormat'
import { useUserStore } from '../../../store/useUserStore'

function ProfileContentsMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

  const user = useUserStore((state) => state.user)

  if (!user) return null

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* 프로필 상단 */}
      <div className="flex flex-col items-center px-4 py-4">
        <Avatar
          name={user.name ?? user.nickname}
          size="xlMobile"
          imgUrl={user.profile_img_url}
        />
        <h2 className="mt-4 text-lg font-bold text-gray-900">{user.name}</h2>
        <p className="mt-1 text-sm text-gray-600">{user.email}</p>
      </div>

      {/* 유저 정보 > 2열 그리드 */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-6 py-8">
        {/* 닉네임 */}
        <div>
          <p className="text-xs text-gray-500">닉네임</p>
          <p className="p-2 text-sm font-medium text-gray-900">
            {user.nickname ?? '-'}
          </p>
        </div>

        {/* 휴대폰 */}
        <div>
          <p className="text-xs text-gray-500">휴대폰</p>
          <p className="p-2 text-sm font-medium text-gray-900">
            {user.phone_number ? phoneFormat(user.phone_number) : '-'}
          </p>
        </div>

        {/* 생년월일 */}
        <div className="col-span-2">
          <p className="text-xs text-gray-500">생년월일</p>
          <p className="p-2 text-sm font-medium text-gray-900">
            {user.birthday ? birthdayFormat(user.birthday) : '-'}
          </p>
        </div>
      </div>

      {/* 구분선 (버튼 여백이랑 같게 하려고) */}
      <div className="mx-6 border-t border-gray-200" />

      {/* 버튼들 */}
      <div className="space-y-3 px-6 py-6">
        {/* 프로필 수정 버튼 - 노란색 */}
        <Button
          variant="primary"
          size="freeWidthLg"
          onClick={() => setIsModalOpen(true)}
        >
          프로필 수정
        </Button>

        {/* 비밀번호 변경 + 회원 탈퇴 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="gray"
            size="lg"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            비밀번호 변경
          </Button>

          <Button
            variant="danger"
            size="lg"
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
        onClose={() => setIsModalOpen(false)}
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

export default ProfileContentsMobile
