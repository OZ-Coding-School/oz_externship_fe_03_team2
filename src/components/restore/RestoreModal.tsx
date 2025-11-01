import Button from '../common/Button'
import { Meh, RotateCw, X } from 'lucide-react'

type RestoreModalProps = {
  title: string
  subtitle: string[]
  children?: React.ReactNode
  isOpen: boolean
  isNext?: boolean
  buttonTitle: string
  handleStep?: () => void
}

function RestoreModal({
  children,
  title,
  subtitle,
  isOpen,
  isNext = false,
  buttonTitle,
  handleStep,
}: RestoreModalProps) {
  if (!isOpen) return
  return (
    //배경
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      {/* 모달창 */}
      <div className="w-100 rounded-xl bg-white p-6">
        {/* 헤더 */}
        <div className="mb-10 flex flex-col gap-2.5">
          <div className="flex justify-end p-[.375rem]">
            <X className="text-gray-400" />
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
        <div>
          <div>{children}</div>
        </div>
        <Button size="freeLogin" onClick={handleStep}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  )
}

export default RestoreModal
