import { useEffect, useState } from 'react'
import { useToken } from '../store/useTokenStore'
import { useUserStore } from '../store/useUserStore'
import { useGetUserMe } from '../api/services/mypage/profile'
import { api } from '../api/client'
import type { UserLoginResponse } from '../types/apiInterface/authInterface'
import type { MeResponse } from '../types/apiInterface/mypageInterface'

export const useAuthInit = () => {
  const [isAuthCheck, setIsAuthCheck] = useState(true) //ture는 인증 확인중 / false는 인증 확인 완료

  const accessToken = useToken((state) => state.accessToken)
  const setAccessToken = useToken((state) => state.setAccessToken)

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  const {
    data: meData,
    isLoading,
    error,
  } = useGetUserMe(!!accessToken && !user) // !!accessToken = accessToken이 있으면 true / !user = user가 없으면 true

  useEffect(() => {
    const initAuth = async () => {
      //accessToken과 user가 모두 있으면 종료
      if (accessToken && user) {
        setIsAuthCheck(false)
        return
      }

      try {
        // refreshToken으로 accessToken 발급
        const res = await api.post<UserLoginResponse>(
          '/v1/auth/refresh',
          {},
          { skipAuth: true }
        )

        const newAccessToken = res.data.access
        setAccessToken(newAccessToken)

        // user 정보 조회
        const userRes = await api.get<MeResponse>('/v1/users/me')

        setUser(userRes)
      } catch {
        clearUser() // refreshToken이 없거나 만료 > 로그아웃 상태
      } finally {
        setIsAuthCheck(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //탠스텍쿼리로 조회한 user 정보 저장
  useEffect(() => {
    if (meData) {
      setUser(meData)
      setIsAuthCheck(false)
    }
  }, [meData, setUser])

  // 에러 발생하면 로그아웃 처리
  useEffect(() => {
    if (error) {
      clearUser()
      setIsAuthCheck(false)
    }
  }, [error, clearUser])

  return { isAuthCheck, isLoading }
}
