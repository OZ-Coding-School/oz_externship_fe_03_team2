import { AlertCircle } from 'lucide-react'

interface EmptyDataProps {
  title?: string
  description?: string
}

function EmptyData({
  title = '잘못된 접근입니다',
  description = '올바른 경로로 접근해주세요',
}: EmptyDataProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-8">
      <div className="mb-1 flex h-12 w-12 items-center justify-center">
        <AlertCircle className="text-danger-500 h-6 w-6" />
      </div>
      <div className="mb-1 text-center font-semibold text-gray-700">
        {title}
      </div>
      <p className="text-center text-sm text-gray-500">{description}</p>
    </div>
  )
}

export default EmptyData
