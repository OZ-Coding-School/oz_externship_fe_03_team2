import { Spinner } from './Spinner'

interface LoadingFallbackProps {
  message?: string
}

function LoadingFallback({
  message = '페이지를 불러오는 중...',
}: LoadingFallbackProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="mb-4 flex items-center justify-center">
        <Spinner />
      </div>
      <p className="text-center text-sm text-gray-500">{message}</p>
    </div>
  )
}

export default LoadingFallback
