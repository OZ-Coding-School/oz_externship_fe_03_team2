import React from 'react'
import { X } from 'lucide-react'

type ModalProps = {
  title: string
  subtitle?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

function Modal({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose() // 배경을 직접 클릭했을 때만 닫기
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOutClick}
    >
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        {/* 헤더 */}
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="hover:text-primary-600 text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6">{children}</div>

        {/* 푸터 */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
