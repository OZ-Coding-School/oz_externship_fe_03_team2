import { ArrowUp } from 'lucide-react'
import { useUserStore } from '../store/useUserStore'
import { useEffect, useState } from 'react'

export function UpButton() {
  const { user } = useUserStore()
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShow(scrollY > 270)
    }

    window.addEventListener('scroll', handleScroll)
    // 스크롤 될 때마다 실행되게..
    return () => window.removeEventListener('scroll', handleScroll)
    //클린업
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!show) return null
  // 버튼 안 보여도 될 땐 아예 렌더도 안 되게..

  return (
    <div
      onClick={handleScrollToTop}
      className={`fixed z-10 ${user ? 'right-4 bottom-22 lg:right-5 lg:bottom-25' : 'right-4 bottom-4 lg:right-5 lg:bottom-5'}`}
    >
      <div className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-gray-300 text-white shadow-[0_5px_10px_#00000040] lg:h-[3.7rem] lg:w-[3.7rem]">
        <ArrowUp strokeWidth={4} size={25} />
      </div>
    </div>
  )
}
