import { useSimpleMutation } from '../Helper/useSimpleMutation'
import * as A from '../../types/apiInterface/authInterface'
import { api } from '../client'
import { AxiosError } from 'axios'
import { useSimpleQuery } from '../Helper/useSimpleQuery'

//회원가입-----------------------
export const useSignUp = () => {
  return useSimpleMutation<
    A.SignUpResponse,
    AxiosError<A.Errors>,
    {
      body: A.SignUpRequest
      headers: {
        'X-Email-Verify-Token': string
        'X-Phone-Verify-Token': string
      }
    }
  >(({ body, headers }) =>
    api.post('/v1/users', body, { headers, skipAuth: true })
  )
}

//닉네임확인-------------------------------------------
export const useNickNameConfirm = (nickname: string, enabled = false) => {
  return useSimpleQuery<A.NickNameResponse, AxiosError<A.Errors>>(
    ['/v1/users/dup-nickname', nickname],
    () =>
      api.get(`/v1/users/dup-nickname?nickname=${nickname}`, {
        skipAuth: true,
      }),
    {
      enabled: enabled && nickname.length > 0,
      retry: false,
      throwOnError: false,
    }
  )
}

//휴대폰 인증 코드 전송-----------------
export const usePhoneSend = () => {
  return useSimpleMutation<
    A.PhoneSendResponse,
    AxiosError<A.Errors>,
    A.PhoneSendRequest
  >((body) =>
    api.post('/v1/phone-verifications/signup/send-code', body, {
      skipAuth: true,
    })
  )
}

//휴대폰 인증 코드 확인-----------------
export const usePhoneConfirm = () => {
  return useSimpleMutation<
    A.PhoneConfirmResponse,
    AxiosError<A.Errors>,
    A.PhoneConfirmRequest
  >((body) =>
    api.post('/v1/phone-verifications/signup/confirm-code', body, {
      skipAuth: true,
    })
  )
}

//이메일 인증 코드 전송
export const useEmailSend = () => {
  return useSimpleMutation<
    A.EmailSendResponse,
    AxiosError<A.Errors>,
    A.EmailSendRequest
  >((body) =>
    api.post('/v1/email-verifications/signup/send-code', body, {
      skipAuth: true,
    })
  )
}

//이메일 인증 코드 확인-----------------
export const useEmailConfirm = () => {
  return useSimpleMutation<
    A.EmailConfirmResponse,
    AxiosError<A.Errors>,
    A.EmailConfirmRequest
  >((body) =>
    api.post('/v1/email-verifications/signup/confirm-code', body, {
      skipAuth: true,
    })
  )
}

//로그인------------------------
export const useLogin = () => {
  return useSimpleMutation<
    A.UserLoginResponse,
    AxiosError<A.Errors>,
    A.UserLoginRequest
  >((body) => api.post('/v1/auth/login', body, { skipAuth: true }))
}

//리프레쉬------------------------
export const useRefresh = () => {
  return useSimpleMutation<A.Refresh, AxiosError<A.Errors>>(() =>
    api.post('/v1/auth/refresh', { skipAuth: true })
  )
}

//로그아웃-----------------------
export const useLogout = () => {
  return useSimpleMutation<A.Logout, AxiosError<A.Errors>, void>(() =>
    api.post('/v1/auth/logout')
  )
}

//카카오 소셜 로그인-----------------
export const useKakaoLogin = () => {
  return useSimpleMutation<
    A.KakaoLoginResponse,
    AxiosError<A.Errors>,
    A.KakaoLoginRequest
  >((body) => api.post('/v1/auth/social/kakao', body, { skipAuth: true }))
}

//네이버 소셜 로그인-----------------
export const useNaverLogin = () => {
  return useSimpleMutation<
    A.NaverLoginResponse,
    AxiosError<A.Errors>,
    A.NaverLoginRequest
  >((body) => api.post('/v1/auth/social/naver', body, { skipAuth: true }))
}
