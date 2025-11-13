import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type {
  DetailApplicationResponse,
  MyApplicationResponse,
} from '../../../types/apiInterface/mypageInterface'

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

      return api.get<DetailApplicationResponse>(
        `/v1/recruitments/applications/me/${application_uuid}`
      )
    },
    { enabled: enabled && !!application_uuid } // uuid가 있을 때만 쿼리 실행
  )
}
