import { useNavigate } from 'react-router'
import { useToken } from '../store/useTokenStore'
import { useEffect } from 'react'
import { showToast } from '../utils/showToast'
import { useSocialState } from '../store/useSocialStore'
import { useKakaoLogin, useNaverLogin } from '../api/services/Auth'

function SocialCallback() {
  const navigate = useNavigate()
  const { setAccessToken } = useToken()
  const { socialState, clearState } = useSocialState()
  const { mutate: naverLogin } = useNaverLogin()
  const { mutate: kakaoLogin } = useKakaoLogin()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    if (!code) {
      showToast('오류가 발생했습니다.', 'error', '로그인')
      clearState()
      navigate('/login')
      return
    }

    if (state) {
      if (state !== socialState) {
        showToast('오류가 발생했습니다.', 'error', '로그인')
        clearState()
        navigate('/login')
        return
      }

      naverLogin(
        { code, state },
        {
          onSuccess: (data) => {
            showToast(`${data.detail}`, 'success', '로그인')
            setAccessToken(data.data.access_token)
            clearState()
            navigate('/')
          },
          onError: (error) => {
            showToast(`${error.response?.data.error}`, 'error', '로그인')
            clearState()
            navigate('/login')
          },
        }
      )
    } else {
      kakaoLogin(
        { access_token: code },
        {
          onSuccess: (data) => {
            showToast(`${data.detail}`, 'success', '로그인')
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
  }, [])
  return <div>소셜로그인중</div>
}

export default SocialCallback
