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
    A.SignUpRequest
  >((body) => api.post('/api/v1/users', body))
}

//닉네임확인-------------------------------------------
export const useNickNameConfirm = (nickname: string) => {
  return useSimpleQuery<A.NickNameResponse, AxiosError<A.Errors>>(
    ['/api/v1/users/check-nickname', nickname],
    () => api.get(`/api/v1/users/check-nickname?nickname=${nickname}`)
  )
}

//휴대폰 인증 코드 전송-----------------
export const usePhoneSend = () => {
  return useSimpleMutation<
    A.PhoneSendResponse,
    AxiosError<A.Errors>,
    A.PhoneSendRequest
  >((body) => api.post('/api/v1/phone-verifications/signup/send-code', body))
}

//휴대폰 인증 코드 확인-----------------
export const usePhoneConfirm = () => {
  return useSimpleMutation<
    A.PhoneConfirmResponse,
    AxiosError<A.Errors>,
    A.PhoneConfirmRequest
  >((body) => api.post('/api/v1/phone-verifications/signup/confirm-code', body))
}

//이메일 인증 코드 전송
export const useEmailSend = () => {
  return useSimpleMutation<
    A.EmailSendResponse,
    AxiosError<A.Errors>,
    A.EmailSendRequest
  >((body) => api.post('/api/v1/email-verifications/signup/send-code', body))
}

//이메일 인증 코드 확인-----------------
export const useEmailConfirm = () => {
  return useSimpleMutation<
    A.EmailConfirmResponse,
    AxiosError<A.Errors>,
    A.EmailConfirmRequest
  >((body) => api.post('/api/v1/email-verifications/signup/confirm-code', body))
}

//로그인------------------------
export const useLogin = () => {
  return useSimpleMutation<
    A.UserLoginResponse,
    AxiosError<A.Errors>,
    A.UserLoginRequest
  >((body) => api.post('/api/v1/auth/login', body))
}

//리프레쉬------------------------
export const useRefrersh = () => {
  return useSimpleMutation<A.Refresh, AxiosError<A.Errors>>(() =>
    api.post('/api/v1/auth/refresh')
  )
}

//로그아웃-----------------------
export const useLogout = () => {
  return useSimpleMutation<A.Logout, AxiosError<A.Errors>>(() =>
    api.post('/api/v1/auth/logout', {}, { skipAuth: true })
  )
}

//카카오 소셜 로그인-----------------
export const useKakaoLogin = () => {
  return useSimpleMutation<
    A.KakaoLoginResponse,
    AxiosError<A.Errors>,
    A.KakaoLoginRequest
  >((body) => api.post('/api/v1/auth/social/kakao', body))
}

//네이버 소셜 로그인-----------------
export const useNaverLogin = () => {
  return useSimpleMutation<
    A.NaverLoginResponse,
    AxiosError<A.Errors>,
    A.NaverLoginRequest
  >((body) => api.post('/api/v1/auth/social/naver', body))
}
