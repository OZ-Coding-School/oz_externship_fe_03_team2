import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type {
  MeResponse,
  PhoneVerificationSendRequest,
  PhoneVerificationSendResponse,
  PhoneVerificationConfirmRequest,
  PhoneVerificationConfirmResponse,
  UpdateMeRequest,
  UpdateProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  LectureBookmarksResponse,
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

  return useSimpleMutation<
    UpdateProfileResponse['data'],
    Error,
    UpdateMeRequest
  >(
    async (data: UpdateMeRequest) => {
      const res = await api.patch<UpdateProfileResponse>(
        '/v1/users/update-profile',
        data
      )
      return res.data
    },
    {
      // 성공 후에 전역상태 업데이트
      onSuccess: (responseData: UpdateProfileResponse['data']) => {
        setUser(responseData as unknown as MeResponse) // MeResponse 타입으로 타입 안전하게
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

// 북마크 강의 조회 (GET)
export const useGetLectureBookmarks = (
  page?: number,
  page_size?: number,
  enabled = true
) => {
  return useSimpleQuery<LectureBookmarksResponse>(
    ['/v1/lectures/bookmarks', page, page_size], // 캐시 키에 파라미터 포함
    async () => {
      const isError = false // 테스트 플래그, true일 때만 에러 발생

      if (isError) throw new Error('북마크한 강의를 불러오는데 실패했습니다')

      return api.get<LectureBookmarksResponse>('/v1/lectures/bookmarks', {
        params: {
          ...(page !== null && { page }),
          ...(page_size !== null && { page_size }),
        },
      })
    },
    { enabled }
  )
}

// 북마크 강의 삭제 (DELETE)
export const useRemoveLectureBookmark = () => {
  return useSimpleMutation<
    void,
    Error,
    string // lecture_uuid를 파라미터로 받음
  >(
    async (lectureUuid: string) => {
      await api.delete<void>(`/v1/lectures/bookmarks/${lectureUuid}`)
    },
    {
      invalidateKeys: ['/v1/lectures/bookmarks'], // 북마크 리스트 캐시 무효화
    }
  )
}
