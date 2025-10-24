import { Link, useNavigate } from 'react-router'
import Header from '../components/layout/Header'
import InputWithLabel from '../components/common/InputWithLabel'
import Button from '../components/common/Button'
import { useEffect, useState } from 'react'
import validateAll from '../utils/validators'
import useDebounce from '../hooks/useDebounce'
import Toast from '../components/common/toast/Toast'
import { toast } from 'sonner'

interface Form {
  email: string
  password: string
}

const TEST_MAIL = { email: 'test@email.com', password: 'Qwer1234!' }

const FORM_STATE: Form = {
  email: '',
  password: '',
}

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>(FORM_STATE)

  const [error, setError] = useState<Record<string, string>>({})

  const debounceForm = useDebounce(form)

  useEffect(() => {
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateAll(form, true)
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return
    }

    if (
      TEST_MAIL.email === form.email &&
      TEST_MAIL.password === form.password
    ) {
      setForm(FORM_STATE)

      setError({})

      toast.custom(() => <Toast title="로그인" message="성공" type="success" />)
      navigate('/')
    } else {
      toast.custom(() => <Toast title="로그인" message="실패" type="error" />)
    }
  }

  const isFormValid = () => {
    const requiredFields = ['email', 'password'] as const
    const hasAllFields = requiredFields.every(
      (field) => form[field] && !error[field]
    )

    return hasAllFields
  }

  const formSubmit = isFormValid()

  //추후 API 연결
  const kakaoLogin = () => {
    navigate('/')
  }
  const naverLogin = () => {
    navigate('/')
  }

  return (
    <div className="bg-secondary-50 flex min-h-screen flex-col">
      <Header />
      <div className="m-auto flex w-[21.75rem] flex-col items-center justify-center">
        <div className="mb-5 flex">
          <span className="bg-primary-500 mr-2 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white">
            S
          </span>
          <span className="text-primary-600 font-[Roboto] text-3xl leading-[28px] font-bold">
            StudyHub
          </span>
        </div>
        <h1 className="text-secondary-900 mb-2 text-center text-3xl font-bold">
          로그인
        </h1>
        <div className="mb-8 flex gap-1">
          <p className="text-secondary-600 text-sm">아직 계정이 없으신가요?</p>
          <Link to={'/signup'} className="text-primary-600 text-sm">
            회원가입하기
          </Link>
        </div>

        <div className="mb-10 flex w-full flex-col justify-center gap-3">
          <button
            className="flex h-[3.25rem] cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#FEE500] text-[#391C1A]"
            onClick={kakaoLogin}
          >
            <img src="src/assets/kakao.svg" className="p-1" />
            카카오 간편 로그인 / 가입
          </button>
          <button
            className="flex h-[3.25rem] cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#03C75A] text-white"
            onClick={naverLogin}
          >
            <img src="src/assets/naver.svg" className="p-1" />
            네이버 간편 로그인 / 가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2 flex flex-col gap-3">
            <InputWithLabel
              name="email"
              type="email"
              value={form.email}
              error={error['email']}
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
            <InputWithLabel
              name="password"
              type="password"
              value={form.password}
              error={error['password']}
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <Link to={'/emailfind'} className="text-primary-600 text-sm">
              아이디 찾기
            </Link>
            <span className="text-primary-600 p-2 text-sm">|</span>
            <Link to={'/passwordfind'} className="text-primary-600 text-sm">
              비밀번호 찾기
            </Link>
          </div>

          <Button
            type="submit"
            size="freeLogin"
            variant="login"
            disabled={!formSubmit}
          >
            일반회원 로그인
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
