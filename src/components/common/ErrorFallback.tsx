import { AlertCircle } from 'lucide-react'
import Button from './Button'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const errorMessage = error?.message || '일시적인 오류가 발생했습니다'

  return (
    <div className="bg-primary-50 flex w-full flex-col items-center justify-center rounded-lg p-4 sm:p-8">
      <div className="mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center">
        <AlertCircle className="text-danger-600 h-6 w-6" />
      </div>
      <div className="mb-1 text-center font-semibold text-gray-700 sm:text-lg">
        문제가 발생했습니다
      </div>
      <p className="mb-5 text-center text-xs text-gray-500 sm:text-sm">
        {errorMessage}
      </p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  )
}

export default ErrorFallback
