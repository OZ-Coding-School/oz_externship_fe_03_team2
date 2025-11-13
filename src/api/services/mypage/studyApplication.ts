import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type { MyApplicationResponse } from '../../../types/apiInterface/mypageInterface'

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
