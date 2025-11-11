import { ArrowUp } from 'lucide-react'
import { useUserStore } from '../store/useUserStore'

export function UpButton() {
  const { user } = useUserStore()
  return (
    // <div
    //   className={`fixed z-50 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-gray-300 text-white shadow-[0_5px_10px_#00000040] lg:h-[3.7rem] lg:w-[3.7rem] ${user ? 'right-5 bottom-24' : 'right-8 bottom-5'}`}
    // >
    //   <ArrowUp strokeWidth={4} size={25} />
    // </div>

    <div
      className={`fixed z-1000 ${user ? 'right-4 bottom-22 lg:right-5 lg:bottom-25' : 'right-4 bottom-4 lg:right-5 lg:bottom-5'}`}
    >
      <div className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-gray-300 text-white shadow-[0_5px_10px_#00000040] lg:h-[3.7rem] lg:w-[3.7rem]">
        <ArrowUp strokeWidth={4} size={25} />
      </div>
    </div>
  )
}
