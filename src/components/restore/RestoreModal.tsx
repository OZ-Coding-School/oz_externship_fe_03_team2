import { Meh, RotateCw, X } from 'lucide-react'

type RestoreModalProps = {
  title: string
  subtitle: string[]
  children?: React.ReactNode
  isNext?: boolean
  footer: React.ReactNode
  onClose: () => void
}

function RestoreModal({
  children,
  title,
  subtitle,
  isNext = false,
  footer,
  onClose,
}: RestoreModalProps) {
  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose() // 배경을 직접 클릭했을 때만 닫기
  }
  return (
    //배경
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
      onClick={handleOutClick}
    >
      {/* 모달창 */}
      <div className="w-100 rounded-xl bg-white p-6">
        {/* 헤더 */}
        <div className="mb-10 flex flex-col gap-2.5">
          <div className="flex justify-end p-[.375rem]">
            <X className="cursor-pointer text-gray-400" onClick={onClose} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {isNext ? (
              <RotateCw className="bg-primary-100 text-primary-500 flex h-7 w-7 justify-center rounded-4xl p-1" />
            ) : (
              <Meh className="bg-primary-100 text-primary-500 flex h-7 w-7 justify-center rounded-4xl p-1" />
            )}
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm text-gray-600">
              {subtitle.map((subtitle, idx) => (
                <div key={idx} className="text-center">
                  {subtitle}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 본문 */}
        <div className="mb-10">{children}</div>

        {/* 푸터*/}
        <div>{footer}</div>
      </div>
    </div>
  )
}

export default RestoreModal
