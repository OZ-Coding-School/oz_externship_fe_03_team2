import { Inbox, Plus } from 'lucide-react'
import Button from './Button'

export interface NodataProps {
  onClick?: () => void
}

function Nodata({ onClick }: NodataProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[382px] w-[854px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <div className="bg-primary-50 mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full">
          <Inbox className="text-primary-500" />
        </div>
        <div className="mb-2 text-center text-xl font-semibold text-gray-900 not-italic">
          아직 데이터가 없습니다
        </div>
        <div className="mb-6 text-center text-base font-normal text-gray-500 not-italic">
          첫 번째 항목을 추가해보세요
        </div>
        <div className="">
          <Button
            size="lg"
            onClick={onClick}
            icon={<Plus className="h-4 w-4" />}
          >
            새로 만들기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Nodata
