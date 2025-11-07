import {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios'
import { toast } from 'sonner'
import Toast from '../components/common/toast/Toast'
import {
  NETWORK_ERROR_MESSAGES,
  type ErrorResponse,
  type ErrorInfo,
} from '../types/apiType'
import { useToken } from '../store/useTokenStore'
import { api } from './client'
import { showToast } from '../utils/showToast'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean // 커스텀 속성 (인증요청이 아닌것들은 토큰값 안넣게 하려는 플래그 속성)
  }
}

let isRefreshing = false // 전역 플래그, 토큰 갱신 중인지

// Toast 에러 표시
const showErrorToast = (title: string, message: string) => {
  toast.custom((t) => (
    <Toast id={t} title={title} message={message} type="error" />
  ))
}

// 에러핸들러
const handleError = (error: AxiosError<ErrorResponse>) => {
  // 요청은 만들어졌지만 응답이 없는 경우 (네트워크 에러, 타임아웃)
  if (error.request) {
    const errorCode = error.code ?? 'ERR_NETWORK'
    const errorInfo: ErrorInfo = NETWORK_ERROR_MESSAGES[errorCode] ?? {
      title: '네트워크 오류',
      message: '요청을 처리할 수 없습니다. 네트워크를 확인해주세요',
    }
    //NotificationToast에 뜨는 현상으로 수정
    showToast(errorInfo.title, 'error', errorInfo.message)
  }

  return Promise.reject(error) // 4xx랑 5xx는 컴포넌트에서 처리하도록 그냥 전달
}

// 인터셉터 설정
export const setupInterceptors = (apiClient: AxiosInstance) => {
  // 요청 인터셉터, 토큰 자동 추가 (skipAuth가 아닌 경우)
  apiClient.interceptors.request.use((config) => {
    // skipAuth가 true가 아니면 인증요청
    if (!config.skipAuth) {
      const token = useToken.getState().accessToken

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  // 응답 인터셉터,  401 자동 갱신
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as AxiosRequestConfig

      // 401 에러 + skipAuth가 아니고 아직 갱신 중이 아닌 경우
      if (
        error.response?.status === 401 &&
        !originalRequest.skipAuth &&
        !isRefreshing
      ) {
        isRefreshing = true

        try {
          // refreshToken으로 새로운 accessToken 발급
          const response = await api.post<{
            detail: string
            data: {
              access: string
            }
          }>(
            `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
            {},
            {
              withCredentials: true,
              skipAuth: true,
            }
          )

          const newAccessToken = response.data.access
          useToken.getState().setAccessToken(newAccessToken)

          // 원래 요청에 새 토큰 추가 후 재시도
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          }

          return apiClient(originalRequest)
        } catch (refreshError) {
          // refresh 실패시 로그아웃 처리
          useToken.getState().clearAccessToken()
          showErrorToast('인증 만료', '다시 로그인해주세요')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false // 갱신 완료 후 플래그 리셋
        }
      }

      // 이미 갱신 중이면 그냥 에러 반환 > 무한루프 방지
      if (error.response?.status === 401 && isRefreshing) {
        return Promise.reject(error)
      }

      return handleError(error)
    }
  )
}
