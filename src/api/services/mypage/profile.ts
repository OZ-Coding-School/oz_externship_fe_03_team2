import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type { MeResponse } from '../../../types/apiInterface/mypageInterface'

// 내 정보 조회 (GET)
export const useGetUserMe = (enabled = true) => {
  return useSimpleQuery<MeResponse>(
    ['/v1/users/me'],
    () => api.get<MeResponse>('/v1/users/me'),
    { enabled } // 필요할 때만 실행
  )
}
