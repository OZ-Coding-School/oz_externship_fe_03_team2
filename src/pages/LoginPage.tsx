import { Link } from 'react-router'
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

function LoginPage() {
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  })

  const [error, setError] = useState<Record<string, string>>({})

  const debounceForm = useDebounce(form)

  useEffect(() => {
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

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

    setForm({
      email: '',
      password: '',
    })
    setError({})
    toast.custom(() => <Toast title="제출" message="성공" type="success" />)
  }

  return (
    <div className="bg-secondary-50 min-h-screen">
      <Header />
      <div className="mx-auto flex w-[21.75rem] flex-col items-center justify-center">
        <h1>로그인</h1>
        <div className="flex gap-3">
          <p>아직 계정이 없으신가요?</p>
          <Link to={'/signup'}>회원가입하기</Link>
        </div>
        <div className="mb-10 flex flex-col gap-3">
          <button className="text-[000000 85%] bg-[#FEE500]">
            카카오 간편 로그인 / 가입
          </button>
          <button className="bg-[#03C75A] text-white">
            네이버 간편 로그인 / 가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-3">
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

          <Link to={'/emailfind'}>아이디 찾기</Link>
          <Link to={'/passwordfind'}>비밀번호 찾기</Link>

          <Button type="submit" size="freeWidthLg">
            일반회원 로그인
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
