import { useSimpleMutation } from '../api/Helper/useSimpleMutation'
import { api } from './client'
import { showToast } from '../utils/showToast'
import type {
  EmailSendResponse,
  EmailConfirmResponse,
} from '../types/apiInterface/authInterface'

/* 탈퇴계정 복구 - 이메일 인증코드 전송 */
export const sendRestoreEmailCode = (email: string) =>
  api.post<EmailSendResponse>(
    '/v1/email-verifications/restore-user/send-code',
    { email },
    { skipAuth: true }
  )

/* 탈퇴계정 복구 - 이메일 인증코드 확인 */
export const confirmRestoreEmailCode = async (body: {
  email: string
  verification_code: string
  request_id: string
}) => {
  return await api.post<EmailConfirmResponse>(
    '/v1/email-verifications/restore-user/confirm-code',
    body,
    { skipAuth: true }
  )
}

/* 이메일 인증코드 전송 훅 */
export const useSendRestoreEmailCode = () => {
  return useSimpleMutation<EmailSendResponse, Error, string>(
    sendRestoreEmailCode,
    {
      onSuccess: (data) => {
        if (data?.data.request_id) {
          showToast('인증코드를 발송하였습니다.', 'success')
        } else {
          showToast('인증코드 발송 응답이 올바르지 않습니다.', 'warning')
        }
      },
      onError: (error: Error & { response?: { status?: number } }) => {
        const status = error.response?.status
        if (status === 400)
          showToast('이메일 형식이 올바르지 않습니다.', 'error')
        else if (status === 429)
          showToast(
            '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
            'warning'
          )
        else showToast('이메일 전송 실패', 'error')
      },
    }
  )
}

/* 이메일 인증코드 확인 훅 */
export const useConfirmRestoreEmailCode = () => {
  return useSimpleMutation<
    EmailConfirmResponse,
    Error,
    {
      email: string
      verification_code: string
      request_id: string
    }
  >(confirmRestoreEmailCode, {
    onSuccess: (data) => {
      if (data?.data.email_verify_token)
        showToast('이메일 인증이 완료되었습니다.', 'success')
      else showToast('서버 응답에 인증 토큰이 없습니다.', 'warning')
    },
    onError: (error: Error & { response?: { status?: number } }) => {
      const status = error.response?.status
      if (status === 400)
        showToast('잘못된 코드입니다. 다시 확인해주세요.', 'error')
      else if (status === 404)
        showToast('요청 이력이 없거나 만료되었습니다.', 'warning')
      else if (status === 409)
        showToast('이미 인증 완료된 요청입니다.', 'warning')
      else if (status === 410)
        showToast('인증코드가 만료되었습니다.', 'warning')
      else showToast('인증 실패', 'error')
    },
  })
}
/* 탈퇴계정 복구 - 계정 복구 요청 */
export const restoreAccount = (emailVerifyToken: string) =>
  api.post<void>('/v1/users/recovery-account', {
    email_verify_token: emailVerifyToken,
  })

/* 계정 복구 훅 */
export const useRestoreAccount = () => {
  return useSimpleMutation<void, Error, string>(restoreAccount, {
    onSuccess: () => showToast('계정 복구 완료!', 'success'),
    onError: () => showToast('계정 복구 실패', 'error'),
  })
}
