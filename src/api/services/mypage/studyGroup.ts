import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type {
  StudyGroupsResponse,
  GetStudyGroupsParams,
  GetGroupReviewsParams,
  ReviewResponse,
  ReviewRequest,
  UpdateReviewResponse,
} from '../../../types/apiInterface/mypageInterface'
import { useSimpleMutation } from '../../Helper/useSimpleMutation'

//  스터디 그룹 목록 조회 (GET)
export const useGetStudyGroups = (
  params?: GetStudyGroupsParams,
  enabled = true
) => {
  return useSimpleQuery<StudyGroupsResponse>(
    ['/v1/studies/groups', params], // 캐시 키에 파라미터 포함
    async () => {
      return api.get<StudyGroupsResponse>('/v1/studies/groups', {
        params: {
          ...(params?.status && { status: params.status }),
          ...(params?.page !== undefined && { page: params.page }),
          ...(params?.search && { search: params.search }),
          ...(params?.is_member !== undefined && {
            is_member: params.is_member,
          }),
        },
      })
    },
    { enabled }
  )
}

// 스터디 그룹의 리뷰 조회 (GET)
export const useGetGroupReviews = (
  groupUuid: string,
  params?: GetGroupReviewsParams,
  enabled = true
) => {
  return useSimpleQuery<ReviewResponse>(
    ['/v1/studies/groups', groupUuid, 'reviews', params], // 캐시 키에 uuid + 파라미터 포함
    async () => {
      return api.get<ReviewResponse>(
        `/v1/studies/groups/${groupUuid}/reviews`,
        {
          params: {
            ...(params?.page !== undefined && { page: params.page }),
            ...(params?.ordering !== undefined && {
              ordering: params.ordering,
            }),
            ...(params?.page_size !== undefined && {
              page_size: params.page_size,
            }),
            ...(params?.rating !== undefined && { rating: params.rating }),
          },
        }
      )
    },
    { enabled: enabled && !!groupUuid } // groupUuid가 있을때만 실행
  )
}

// 스터디 그룹 리뷰 작성 (POST)
export const useCreateGroupReview = (groupUuid: string) => {
  return useSimpleMutation<
    void, // 응답바디가 없음 > void
    Error,
    ReviewRequest
  >(
    async (reviewData) => {
      await api.post(`/v1/studies/groups/${groupUuid}/reviews`, reviewData)
    },
    {
      invalidateKeys: [
        '/v1/studies/groups', // 스터디 그룹 목록 재조회
      ],
    }
  )
}

// 스터디 그룹 리뷰 수정 (PATCH)
export const useUpdateGroupReview = (groupUuid: string, reviewUuid: string) => {
  return useSimpleMutation<UpdateReviewResponse, Error, ReviewRequest>(
    async (reviewData) => {
      return api.patch<UpdateReviewResponse>(
        `/v1/studies/groups/${groupUuid}/reviews/${reviewUuid}`,
        reviewData
      )
    },
    {
      invalidateKeys: [
        '/v1/studies/groups', // 스터디 그룹 목록 재조회
      ],
    }
  )
}
