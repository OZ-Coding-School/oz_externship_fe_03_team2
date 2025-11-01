import { Check } from 'lucide-react'

type SuccessModalProps = {
  onClose: () => void
}

function SuccessModal({ onClose }: SuccessModalProps) {
  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose() // 배경을 직접 클릭했을 때만 닫기
  }
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
      onClick={handleOutClick}
    >
      <div className="w-100 rounded-xl bg-white p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Check className="bg-success-500 rounded-3xl p-1 text-white" />
          <div className="text-xl font-bold">계정 복구 완료!</div>
          <div className="text-sm text-gray-600">지금 바로 로그인해보세요</div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
