import type { Form } from '../pages/SignUpPage'

const nameRe = /^[A-Za-z가-힣]{2,8}$/
const nicknameRe = /^[A-Za-z0-9가-힣]{2,12}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^\d{11}$/
const codeRe = /^\d{6}$/
const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/
const birthRe = /^\d{8}$/

function isValidDateYYYYMMDD(v: string): boolean {
  if (!birthRe.test(v)) return false
  const y = +v.slice(0, 4),
    m = +v.slice(4, 6),
    d = +v.slice(6, 8)
  const dt = new Date(y, m - 1, d)
  const ok =
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  if (!ok) return false
  return dt <= new Date()
}

function validateField(name: string, value: string, password?: string): string {
  if (!value) return ''

  switch (name) {
    case 'name':
      return nameRe.test(value) ? '' : '2~8자의 한글/영문만 가능합니다'
    case 'nickname':
      return nicknameRe.test(value) ? '' : '2~12자, 한글/영문/숫자만 가능합니다'
    case 'birth':
      return isValidDateYYYYMMDD(value) ? '' : '유효한 날짜를 입력해주세요'
    case 'email':
      return emailRe.test(value) ? '' : '이메일 형식이 올바르지 않습니다'
    case 'phone':
      return phoneRe.test(value) ? '' : '휴대폰 번호를 확인해주세요'
    case 'password':
      return passwordRe.test(value)
        ? ''
        : '8~15자, 대/소문자+숫자+특수문자 포함'
    case 'passwordConfirm':
      return value === password ? '' : '비밀번호가 일치하지 않습니다'
    case 'emailCode':
      return codeRe.test(value) ? '' : '인증번호 6자리를 입력해주세요'
    case 'phoneCode':
      return codeRe.test(value) ? '' : '인증번호 6자리를 입력해주세요'
    default:
      return ''
  }
}

function validateAll(form: Partial<Form>) {
  const error: Record<string, string> = {}
  const fields = [
    'name',
    'nickname',
    'birth',
    'email',
    'phone',
    'password',
    'passwordConfirm',
    'emailCode',
    'phoneCode',
  ] as const //

  for (const key of fields) {
    error[key] = validateField(
      key,
      String(form[key] ?? ''),
      key === 'passwordConfirm' ? form.password : undefined
    )
  }
  return error
}

export default validateAll
