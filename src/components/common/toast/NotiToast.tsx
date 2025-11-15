import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NotiToastType {
  content: string
}

export function NotiToast({ content }: NotiToastType) {
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'} transition-all duration-500 ease-in-out`}
    >
      <div>
        <X onClick={() => setShow(false)} />
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  )
}
