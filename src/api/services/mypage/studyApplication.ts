import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type {
  CancelApplicationResponse,
  DetailApplicationResponse,
  MyApplicationResponse,
} from '../../../types/apiInterface/mypageInterface'
import { useSimpleMutation } from '../../Helper/useSimpleMutation'

// 내가 지원한 공고 내역 조회 (GET)
export const useGetMyApplications = (enabled = true) => {
  return useSimpleQuery<MyApplicationResponse>(
    ['/v1/recruitments/applications/me'], // 캐시 키
    async () => {
      const isError = false // 에러테스트 플래그

      if (isError) throw new Error('지원 내역을 불러오는데 실패했습니다')

      return api.get<MyApplicationResponse>('/v1/recruitments/applications/me')
    },
    { enabled }
  )
}

// 내가 지원한 공고 내역 상세 조회 (GET)
export const useGetApplicationDetail = (
  application_uuid: string,
  enabled = true
) => {
  return useSimpleQuery<DetailApplicationResponse>(
    ['/v1/recruitments/applications/me', application_uuid], // 캐시 키
    async () => {
      const isError = false // 에러테스트 플래그

      if (isError)
        throw new Error('지원 내역 상세 정보를 불러오는데 실패했습니다')

      //   await new Promise((resolve) => setTimeout(resolve, 5000)) //테스트용 5초지연 (로딩 컴포넌트 위치 조정떄문에)

      return api.get<DetailApplicationResponse>(
        `/v1/recruitments/applications/me/${application_uuid}`
      )
    },
    { enabled: enabled && !!application_uuid } // uuid가 있을 때만 쿼리 실행
  )
}

// 지원 취소 (PATCH)
export const useCancelApplication = (application_uuid: string) => {
  return useSimpleMutation<CancelApplicationResponse, Error, void>(
    async () => {
      return api.patch<CancelApplicationResponse>(
        `/v1/recruitments/applications/${application_uuid}/withdraw`
      )
    },
    {
      invalidateKeys: [
        '/v1/recruitments/applications/me', // 지원 내역 목록 재조회
      ],
    }
  )
}
