import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type {
  MeResponse,
  PhoneVerificationSendRequest,
  PhoneVerificationSendResponse,
  PhoneVerificationConfirmRequest,
  PhoneVerificationConfirmResponse,
  UpdateProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  MeWithDrawResponse,
  MeWithDrawRequest,
} from '../../../types/apiInterface/mypageInterface'
import { useSimpleMutation } from '../../Helper/useSimpleMutation'
import { useUserStore } from '../../../store/useUserStore'

// 내 정보 조회 (GET)
export const useGetUserMe = (enabled = true) => {
  return useSimpleQuery<MeResponse>(
    ['/v1/users/me'],
    () => api.get<MeResponse>('/v1/users/me'),
    { enabled } // 필요할 때만 실행
  )
}

// 휴대폰 변경 인증코드 전송 (POST)
export const useSendPhoneVerificationCode = () => {
  return useSimpleMutation<
    PhoneVerificationSendResponse['data'],
    Error,
    PhoneVerificationSendRequest
  >(async (data: PhoneVerificationSendRequest) => {
    const res = await api.post<PhoneVerificationSendResponse>(
      '/v1/phone-verifications/phone-change/send-code',
      data
    )
    return res.data
  })
}

// 휴대폰 변경 인증코드 확인 (POST)
export const useConfirmPhoneVerificationCode = () => {
  return useSimpleMutation<
    PhoneVerificationConfirmResponse['data'],
    Error,
    PhoneVerificationConfirmRequest
  >(async (data: PhoneVerificationConfirmRequest) => {
    const res = await api.post<PhoneVerificationConfirmResponse>(
      '/v1/phone-verifications/phone-change/confirm-code',
      data
    )
    return res.data
  })
}

// 내정보 수정 - 일반 프로필정보 (PATCH)
export const useUpdateProfile = () => {
  const { setUser } = useUserStore()

  return useSimpleMutation<UpdateProfileResponse['data'], Error, FormData>(
    async (data: FormData) => {
      const res = await api.patch<UpdateProfileResponse>(
        '/v1/users/update-profile',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return res.data
    },
    {
      // 성공 후에 전역상태 업데이트
      onSuccess: (responseData: UpdateProfileResponse['data']) => {
        setUser(responseData) // MeResponse 타입으로 타입 안전하게
      },

      invalidateKeys: ['/v1/users/me'], // 캐시무효화
    }
  )
}

// 비밀번호 변경 (PATCH)
export const useChangePassword = () => {
  return useSimpleMutation<
    UpdatePasswordResponse,
    Error,
    UpdatePasswordRequest
  >(async (data: UpdatePasswordRequest) => {
    const res = await api.patch<UpdatePasswordResponse>(
      '/v1/users/change-password',
      data
    )
    return res
  })
}

// 회원탈퇴 (POST)
export const useUserLeave = () => {
  return useSimpleMutation<MeWithDrawResponse, Error, MeWithDrawRequest>(
    async (data: MeWithDrawRequest) => {
      const res = await api.post<MeWithDrawResponse>('/v1/users/withdraw', data)
      return res
    }
  )
}
