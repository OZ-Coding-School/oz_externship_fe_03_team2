import { type AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'sonner'
import Toast from '../components/common/toast/Toast'
import {
  ERROR_MESSAGES,
  type ErrorResponse,
  type ErrorInfo,
} from '../types/apiType'

// Toast 에러 표시
const showErrorToast = (title: string, message: string) => {
  toast.custom((t) => (
    <Toast id={t} title={title} message={message} type="error" />
  ))
}

// 에러핸들러
const handleError = (error: AxiosError<ErrorResponse>) => {
  const status = error.response?.status ?? 500
  const serverMessage = error.response?.data?.message

  const errorInfo: ErrorInfo = ERROR_MESSAGES[status] || {
    title: '요청 오류',
    message: '요청 처리 중 오류가 발생했습니다',
  }

  const finalMessage = serverMessage || errorInfo.message

  showErrorToast(errorInfo.title, finalMessage)

  if (status === 401) window.location.href = '/login' // 401 에러 로그인 페이지로 리다이렉션

  return Promise.reject(error)
}

// 인터셉터 설정
export const setupInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use((config) => config) // 요청 인터셉터

  // 응답 인터셉터
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => handleError(error)
  )
}
