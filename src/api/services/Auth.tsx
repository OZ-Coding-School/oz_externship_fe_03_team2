import { useNavigate } from 'react-router'
import { useSimpleMutation } from '../Helper/useSimpleMutation'
import * as A from '../../types/apiInterface/authInterface'
import { api } from '../client'
import type { AxiosError } from 'axios'

//회원가입
export const SignupAPI = () => {
  const navigate = useNavigate()

  return useSimpleMutation<
    A.SignUpResponse,
    AxiosError<A.Errors>,
    A.SignUpRequest
  >((body) => api.post('/api/v1/users', body), {
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error) => {
      console.error(error.response?.data.error)
    },
  })
}
