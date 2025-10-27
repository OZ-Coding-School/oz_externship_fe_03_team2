import { useSimpleMutation } from '../../Helper/useSimpleMutation'
import * as T from '../../../types/apiInterface/findInterface'
import { api } from '../../client'
import { showToast } from '../showToast'

// 이메일 찾기 - 휴대폰 인증코드
export const useFindEmailSendCode = () => {
  return useSimpleMutation<
    T.FindEmailSendCodeResponse,
    T.SimpleError,
    T.FindEmailSendCodeRequest
  >(
    (body) =>
      api.post('/v1/phone-verifications/find-email/send-code', body, {
        skipAuth: true,
      }),
    {
      onSuccess: () => showToast('인증코드를 발송하였습니다.', 'success'),
    }
  )
}

// 이메일 찾기 - 휴대폰 인증코드 확인
export const useFindEmailConfirmCode = () => {
  return useSimpleMutation<
    T.FindEmailConfirmCodeResponse,
    T.SimpleError,
    T.FindEmailConfirmCodeRequest
  >((body) =>
    api.post('/v1/phone-verifications/find-email/confirm-code', body, {
      skipAuth: true,
    })
  )
}

// 아이디(이메일) 찾기 - 인증코드 확인 후 이메일 반환
export const useRecoveryEmail = () => {
  return useSimpleMutation<
    // GET요청인데 useSimpleQuery가 아니라 Mutation을 쓰는 이윺는 ?
    // verify-token이 버튼 클릭 후에 실행되어 발급받는 동적인 애이기 때문..
    T.RecoveryEmailResponse,
    T.SimpleError,
    string
  >((verifyToken) => {
    return api.get('/v1/recovery/email/', {
      headers: { 'X-Verify-Token': verifyToken },
      // 받은 verify-token을 헤더에 실어서 보냄
      skipAuth: true,
    })
  })
}
