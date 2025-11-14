import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import { DropDown } from '../common/dropDown'
import { showToast } from '../../utils/showToast'
import { useUserLeave } from '../../api/services/mypage/profile'
import { useToken } from '../../store/useTokenStore'
import type { MeWithDrawRequest } from '../../types/apiInterface/mypageInterface'
import { useUserStore } from '../../store/useUserStore'

interface UserLeaveModalProps {
  isOpen: boolean
  onClose: () => void
}

const LEAVE_REASONS = [
  { text: '서비스 이용할 시간이 없음', value: 'NO_LONGER_NEEDED' },
  { text: '관심이 사라짐', value: 'LACK_OF_INTEREST' },
  { text: '서비스를 이용하기가 너무 어려움', value: 'TOO_DIFFICULT' },
  { text: '더 좋은 대안을 찾음', value: 'FOUND_BETTER_SERVICE' },
  { text: '개인정보/보안 우려', value: 'PRIVACY_CONCERNS' },
  { text: '서비스 품질 불만', value: 'POOR_SERVICE_QUALITY' },
  { text: '기술적 문제(버그 등)', value: 'TECHNICAL_ISSUES' },
  { text: '원하는 콘텐츠나 기능의 부족', value: 'LACK_OF_CONTENT' },
  { text: '기타', value: 'OTHER' },
]

function UserLeaveModal({ isOpen, onClose }: UserLeaveModalProps) {
  const [selectedReason, setSelectedReason] =
    useState('서비스 이용할 시간이 없음')
  const [detailReason, setDetailReason] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const { clearUser } = useUserStore()

  const navigate = useNavigate()

  const { mutate: userLeave, isPending } = useUserLeave()
  const { clearAccessToken } = useToken.getState()

  const handleSubmit = () => {
    if (!selectedReason || !detailReason || !isChecked) {
      showToast('모든 항목을 입력해주세요', 'error', '회원탈퇴 실패')
      return
    }

    const selectedOption = LEAVE_REASONS.find((r) => r.text === selectedReason)

    const userLeaveData: MeWithDrawRequest = {
      reason: selectedOption?.value || selectedReason,
      reason_detail: detailReason,
    }

    userLeave(userLeaveData, {
      onSuccess: () => {
        clearAccessToken()
        clearUser()
        showToast('이용해주셔서 감사합니다', 'success', '회원탈퇴 성공')
        navigate('/')
        onClose()
      },
      onError: () => {
        showToast('회원탈퇴 실패', 'error', '다시 시도해주세요')
      },
    })
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="text-danger-600 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertCircle size={16} />
          </div>
          회원 탈퇴
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? '처리 중...' : '회원 탈퇴'}
          </Button>
        </>
      }
    >
      {/* 안내 메시지 */}
      <div className="mb-6 rounded-lg bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle
            className="text-danger-500 mt-0.5 flex-shrink-0"
            size={14}
          />
          <div className="text-danger-800 text-sm">
            <p className="font-semibold">회원 탈퇴 안내</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• 탈퇴 즉시 서비스 이용이 중단됩니다</li>
              <li>
                • <span className="font-bold">2주간 계정 복구가 가능</span>
                합니다
              </li>
              <li>• 2주 후 모든 개인정보가 완전히 삭제됩니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 탈퇴 사유 드롭다운 */}
      <div className="mb-4">
        <DropDown
          label="탈퇴 사유"
          required
          placeholder="서비스 이용할 시간이 없음"
          options={LEAVE_REASONS}
          size="wFree"
          onSelect={(value) => setSelectedReason(value)}
        />
      </div>

      {/* 탈퇴 상세 사유 */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          탈퇴 상세 사유<span className="text-danger-500 ml-1">*</span>
        </label>
        <textarea
          value={detailReason}
          onChange={(e) => setDetailReason(e.target.value)}
          placeholder="탈퇴 사유를 입력해주세요."
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none"
          rows={4}
        />
      </div>

      {/* 동의 체크박스 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="confirm"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="text-danger-500 h-3 w-3 cursor-pointer rounded border-gray-300"
        />
        <label
          htmlFor="confirm"
          className="cursor-pointer text-xs text-gray-700"
        >
          회원 탈퇴에 동의합니다<span className="text-danger-500 ml-1">*</span>
        </label>
      </div>
    </Modal>
  )
}

export default UserLeaveModal
