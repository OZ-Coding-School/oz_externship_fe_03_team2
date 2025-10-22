import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import Toast from '../common/toast/Toast'
import { useNavigate } from 'react-router'
import { DropDown } from '../common/dropDown'

interface UserLeaveModalProps {
  isOpen: boolean
  onClose: () => void
}

const LEAVE_REASONS = [
  { text: '서비스 불만족' },
  { text: '탈퇴사유2' },
  { text: '탈퇴사유3' },
  { text: '탈퇴사유4' },
  { text: '기타' },
]

function UserLeaveModal({ isOpen, onClose }: UserLeaveModalProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [detailReason, setDetailReason] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!selectedReason || !detailReason || !isChecked) {
      toast.custom((t) => (
        <Toast
          id={t}
          title="회원탈퇴 실패"
          message="모든 항목을 입력해주세요"
          type="error"
        />
      ))
      return
    }

    toast.custom((t) => (
      <Toast
        id={t}
        title="회원탈퇴 성공"
        message="이용해주셔서 감사합니다"
        type="success"
      />
    ))
    navigate('/')
    onClose()
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
          <Button variant="outline" size="md" onClick={onClose}>
            취소
          </Button>
          <Button variant="danger" size="md" onClick={handleSubmit}>
            회원 탈퇴
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
          placeholder="서비스 불만족"
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
