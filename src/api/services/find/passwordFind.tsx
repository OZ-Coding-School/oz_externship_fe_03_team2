import { useSimpleMutation } from '../../Helper/useSimpleMutation'
import * as T from '../../../types/apiInterface/findInterface'
import { api } from '../../client'
import { showToast } from '../showToast'
import { useNavigate } from 'react-router'

// 비밀번호 찾기 전 인증 - 이메일 인증코드 전송
export const useEmailVerificationSendCode = () => {
  return useSimpleMutation<
    T.EmailVerificationSendCodeResponse,
    T.SimpleError,
    T.EmailVerificationConfirmCodeRequest
  >((body) => api.post('/v1/email/verifications/send-code', body), {
    onSuccess: () => showToast('인증코드를 보냈습니다.', 'success'),
  })
}

// 비밀번호 찾기 전 인증 - 이메일 인증코드 확인
export const useEmailVerificationConfirmCode = () => {
  return useSimpleMutation<
    T.EmailVerificationConfirmCodeResponse,
    T.SimpleError,
    T.EmailVerificationConfirmCodeRequest
  >((body) => api.post('/v1/email/verifications/confirm-code', body))
}

// 비밀번호 재설정 - 토큰 검증 후 새 비밀번호로 변경
export const useRecoveryPassword = () => {
  const navigate = useNavigate()
  return useSimpleMutation<T.Detail, T.SimpleError, T.RecoveryPasswordRequest>(
    (data) => {
      const { body, verifyToken } = data
      return api.post('/v1/recovery/password/', body, {
        headers: { 'X-Verify-Token': verifyToken },
      })
    },
    {
      onSuccess: () => {
        showToast(
          '새 비밀번호로 로그인해주세요.',
          'success',
          '비밀번호가 재설정되었습니다'
        )
        navigate('/login')
      },
    }
  )
}
