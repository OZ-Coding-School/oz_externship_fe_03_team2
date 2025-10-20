import { type AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'sonner'
import Toast from '../components/common/toast/Toast'
import {
  ERROR_MESSAGES,
  NETWORK_ERROR_MESSAGES,
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
  // 서버 응답이 있는 경우
  if (error.response) {
    const status = error.response.status
    const serverMessage = error.response.data?.message

    const errorInfo: ErrorInfo = ERROR_MESSAGES[status] ?? {
      title: '요청 오류',
      message: '요청 처리 중 오류가 발생했습니다',
    }

    const finalMessage = serverMessage ?? errorInfo.message
    showErrorToast(errorInfo.title, finalMessage)

    if (status === 401) window.location.href = '/login' // 401 에러 로그인 페이지로 이동
  }

  // 요청은 만들어졌지만 응답이 없는 경우 (네트워크 에러, 타임아웃)
  else if (error.request) {
    const errorCode = error.code ?? 'ERR_NETWORK'
    const errorInfo: ErrorInfo = NETWORK_ERROR_MESSAGES[errorCode] ?? {
      title: '네트워크 오류',
      message: '요청을 처리할 수 없습니다. 네트워크를 확인해주세요',
    }

    showErrorToast(errorInfo.title, errorInfo.message)
  }

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
