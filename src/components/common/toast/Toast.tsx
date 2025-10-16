import { CircleX, CircleAlert, CircleCheck, X } from 'lucide-react'
import { toast } from 'sonner'

// 토스트 알림 안쪽 내용

interface ToastType {
  id?: string | number //x버튼으로 닫기 할 거면 이것도 써넣기..
  title: string
  message: string
  type: 'error' | 'warning' | 'success'
}

export default function Toast({ id, title, message, type }: ToastType) {
  const toastUi = {
    error: {
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#FECACA]',
      icon: <CircleX size={23} />,
      textColor: 'text-[#B91C1C]',
      iconColor: 'text-[#F87171]',
    },
    warning: {
      bg: 'bg-[#FEFCE8]',
      border: 'border-[#FEF08A]',
      icon: <CircleAlert size={23} />,
      textColor: 'text-[#A16207]',
      iconColor: 'text-[#FACC15]',
    },
    success: {
      bg: 'bg-[#F0FDF4]',
      border: 'border-[#BBF7D0]',
      icon: <CircleCheck size={23} />,
      textColor: 'text-[#15803D]',
      iconColor: 'text-[#4ADE80]',
    },
  }

  return (
    <div
      className={`relative flex h-[4.875rem] w-[28rem] items-start justify-between gap-3 rounded-lg border p-[.875rem] text-[.875rem] select-none ${toastUi[type].border} ${toastUi[type].bg}`}
    >
      <div className="flex gap-[.75rem]">
        <span className={`${toastUi[type].iconColor}`}>
          {toastUi[type].icon}
        </span>
        <div className={`${toastUi[type].textColor}`}>
          <p>{title}</p>
          <p>{message}</p>
        </div>
      </div>
      <span
        onClick={() => toast.dismiss(id)}
        className={`${toastUi[type].iconColor}`}
      >
        <X size={20} />
      </span>
    </div>
  )
}
