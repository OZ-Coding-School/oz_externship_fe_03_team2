import { useNavigate } from 'react-router'
import { useToken } from '../store/useTokenStore'
import { useEffect } from 'react'
import { showToast } from '../utils/showToast'
import { useKakaoLogin, useNaverLogin } from '../api/services/Auth'
import { useUserStore } from '../store/useUserStore'
import Header from '../components/layout/Header'

function SocialCallback() {
  const navigate = useNavigate()
  const { setAccessToken } = useToken()
  const { mutate: naverLogin } = useNaverLogin()
  const { mutate: kakaoLogin } = useKakaoLogin()
  const { setUser } = useUserStore()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')
    const naverState = sessionStorage.getItem('naver_state')

    if (!code) {
      showToast('오류가 발생했습니다.', 'error', '로그인')
      sessionStorage.clear()
      navigate('/login')
      return
    }

    if (state && state !== naverState) {
      showToast('오류가 발생했습니다.', 'error', '로그인')
      sessionStorage.clear()
      navigate('/login')
      return
    }

    const handleLogin = () => {
      if (state) {
        naverLogin(
          { code, state },
          {
            onSuccess: (data) => {
              showToast(`${data.detail}`, 'success', '로그인')
              setUser(data.data.user)
              setAccessToken(data.data.access_token)
              sessionStorage.clear()
              navigate('/')
            },
            onError: (error) => {
              showToast(`${error.response?.data.error}`, 'error', '로그인')
              sessionStorage.clear()
              navigate('/login')
            },
          }
        )
      } else {
        kakaoLogin(
          { code },
          {
            onSuccess: (data) => {
              showToast(`${data.detail}`, 'success', '로그인')
              setUser(data.data.user)
              setAccessToken(data.data.access_token)
              navigate('/')
            },
            onError: (error) => {
              showToast(`${error.response?.data.error}`, 'error', '로그인')
              navigate('/login')
            },
          }
        )
      }
    }

    handleLogin()
  }, [navigate, setAccessToken, setUser, naverLogin, kakaoLogin])
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-primary-500 text-5xl">로그인 하는 중...</h1>
        <p className="text-gray-600">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}

export default SocialCallback
