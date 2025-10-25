import { useSimpleMutation } from '../Helper/useSimpleMutation'
import { useSimpleQuery } from '../Helper/useSimpleQuery'
import { api } from '../client'
import Toast from '../../components/common/toast/Toast'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import * as T from '../../types/apiInterface/authInterface'
import { useToken } from '../../store/useTokenStore'

export const showToast = (
  message: string,
  type: 'error' | 'warning' | 'success',
  title?: string
) => {
  toast.custom((t) => (
    <Toast id={t} title={title} message={message} type={type} />
  ))
}

// 회원가입
export const useSignup = () => {
  const navigate = useNavigate()

  return useSimpleMutation<
    T.SignupResponse,
    T.ComplexErrors,
    T.SignupRequestBody
  >((body) => api.post('/users', body), {
    onSuccess: () => {
      showToast('로그인을 시도해주세요.', 'success', '회원가입에 성공했습니다')
      navigate('/login')
    },
  })
}

// 닉네임 중복 확인
export const useCheckNick = (nickname: string, enabled = false) => {
  return useSimpleQuery<T.CheckNicknameResponse, T.SimpleError>(
    ['/users/check-nickname', nickname],
    () =>
      api.get(
        `/v1/users/check-nickname?nickname=${encodeURIComponent(nickname)}`
      ),
    {
      enabled: enabled && nickname.length > 0,
      staleTime: 0,
      retry: false,
    }
  )
}

// 휴대폰 인증코드 전송 (회원가입)
export const usePhonePublicSendCode = () => {
  return useSimpleMutation<
    T.PhoneSendCodeResponse,
    T.SimpleError,
    T.PhonePublicSendCodeRequest
  >((body) => api.post('/v1/phone-verifications/signup/send-code', body), {
    onSuccess: () => showToast('인증번호를 전송했습니다', 'success'),
  })
}

// 휴대폰 인증코드 확인 (회원가입)
export const usePhonePublicConfirmCode = () => {
  return useSimpleMutation<
    T.PhoneConfirmCodeResponse,
    T.SimpleError,
    T.PhonePublicConfirmCodeRequest
  >((body) => api.post('v1/phone-verifications/signup/confirm-code', body))
}

// 이메일 인증코드 전송
export const useEmailSendCode = () => {
  return useSimpleMutation<
    T.EmailSendCodeResponse,
    T.SimpleError,
    T.EmailSendCodeRequest
  >((body) => api.post('/v1/email/verifications/send-code', body), {
    onSuccess: () => showToast('인증번호를 전송했습니다', 'success'),
  })
}

// 이메일 인증코드 확인
export const useEmailConfirmCode = () => {
  return useSimpleMutation<
    T.EmailConfirmCodeResponse,
    T.SimpleError,
    T.EmailConfirmCodeRequest
  >((body) => api.post('/v1/email/verifications/confirm-code', body))
}

// 로그인
export const useLogin = () => {
  const navigate = useNavigate()
  const { setAccessToken } = useToken()
  return useSimpleMutation<T.LoginResponse, T.SimpleError, T.LoginRequest>(
    (body) => api.post('v1/auth/login', body),
    {
      removeKeys: ['auth'],
      onSuccess: (data) => {
        setAccessToken(data.data.access_token)
        showToast('로그인하였습니다.', 'success', '반가워요!')
        navigate('/')
      },
    }
  )
}

// 액세스 토큰 갱신
export const useRefresh = () => {
  const { setAccessToken } = useToken()
  return useSimpleMutation<T.RefreshResponse, T.SimpleError, void>(
    () => api.post('/v1/auth/refresh', {}),
    {
      onSuccess: (data) => {
        setAccessToken(data.data.access_token)
      },
    }
  )
}

// 사용자, 소셜 로그아웃
export const useLogout = () => {
  const { clearAuth } = useToken()
  return useSimpleMutation<void, T.SimpleError, void>(
    () => api.post('/v1/auth/logout', {}),
    {
      removeKeys: ['/auth'],
      onSettled: () => {
        clearAuth()
        showToast('로그아웃되었습니다', 'success', '안녕히 가세요')
      },
    }
  )
}

// 소셜 로그인 (카카오)
export const useSocialKakao = () => {
  const { setAccessToken } = useToken()
  const navigate = useNavigate()
  return useSimpleMutation<
    T.SocialLoginResponse,
    T.SimpleError,
    T.SocialKakaoRequest
  >((body) => api.post('/v1/auth/social/kakao', body), {
    removeKeys: ['auth'],
    onSuccess: (data) => {
      setAccessToken(data.data.access_token)
      showToast('로그인하였습니다.', 'success', '반가워요!')
      navigate('/')
    },
  })
}

// 소셜 로그인 (네이버)
export const useSocialNaver = () => {
  const { setAccessToken } = useToken()
  const navigate = useNavigate()
  return useSimpleMutation<
    T.SocialLoginResponse,
    T.SimpleError,
    T.SocialNaverRequest
  >((body) => api.post('/v1/auth/social/kakao', body), {
    removeKeys: ['auth'],
    onSuccess: (data) => {
      setAccessToken(data.data.access_token)
      showToast('로그인하였습니다.', 'success', '반가워요!')
      navigate('/')
    },
  })
}
