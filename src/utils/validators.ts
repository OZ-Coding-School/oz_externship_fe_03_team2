import type { Form } from '../pages/SignUpPage'

const nameRe = /^[A-Za-z가-힣]{2,8}$/
const nicknameRe = /^[A-Za-z0-9가-힣]{2,12}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^\d{11}$/
const codeRe = /^\d{6}$/
const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/
const birthRe = /^\d{8}$/

function isValidDateYYYYMMDD(formdata: string): boolean {
  if (!birthRe.test(formdata)) return false
  const year = +formdata.slice(0, 4)
  const month = +formdata.slice(4, 6)
  const date = +formdata.slice(6, 8)
  const birth = new Date(year, month - 1, date)
  const birthConfirm =
    birth.getFullYear() === year &&
    birth.getMonth() === month - 1 &&
    birth.getDate() === date
  if (!birthConfirm) return false
  return birth <= new Date()
}

function validateField(
  name: string,
  formdata: string,
  password?: string,
  submit: boolean = false // submit이 true라면 빈값인지 먼저 체크 (제출시)
): string {
  if (submit && !formdata) {
    switch (name) {
      case 'name':
        return '이름을 입력해주세요'
      case 'nickname':
        return '닉네임을 입력해주세요'
      case 'birth':
        return '생년월일을 입력해주세요'
      case 'email':
        return '이메일을 입력해주세요'
      case 'phone':
        return '핸드폰 번호를 입력해주세요'
      case 'password':
        return '비밀번호를 입력해주세요'
      case 'passwordConfirm':
        return '비밀번호를 확인해주세요'
      case 'emailCode':
        return '인증번호를 입력해주세요'
      case 'phoneCode':
        return '인증번호를 입력해주세요'
      default:
        return ''
    }
  }

  if (!formdata) return ''

  switch (name) {
    case 'name':
      return nameRe.test(formdata) ? '' : '2~8자의 한글/영문만 가능합니다'
    case 'nickname':
      return nicknameRe.test(formdata)
        ? ''
        : '2~12자, 한글/영문/숫자만 가능합니다'
    case 'birth':
      return isValidDateYYYYMMDD(formdata) ? '' : '유효한 날짜를 입력해주세요'
    case 'email':
      return emailRe.test(formdata) ? '' : '이메일 형식이 올바르지 않습니다'
    case 'phone':
      return phoneRe.test(formdata) ? '' : '휴대폰 번호를 확인해주세요'
    case 'password':
      return passwordRe.test(formdata)
        ? ''
        : '8~15자, 대소문자+숫자+특수문자 포함 해주세요'
    case 'passwordConfirm':
      return formdata === password ? '' : '비밀번호가 일치하지 않습니다'
    case 'emailCode':
      return codeRe.test(formdata) ? '' : '인증번호 6자리를 입력해주세요'
    case 'phoneCode':
      return codeRe.test(formdata) ? '' : '인증번호 6자리를 입력해주세요'
    default:
      return ''
  }
}

function validateAll(form: Partial<Form>, submit: boolean = false) {
  // Partial은 모든 속성을 옵셔널로 만들어줌
  const error: Record<string, string> = {}
  const fields = [
    'name',
    'nickname',
    'birthday',
    'email',
    'phone_number',
    'password',
    'passwordConfirm',
    'emailCode',
    'phoneCode',
  ] as const // 리터럴 값으로 바꿔주고 readonly로 변경시켜줌

  for (const key of fields) {
    if (!(key in form)) continue

    const fieldError = validateField(
      key,
      String(form[key] ?? ''),
      key === 'passwordConfirm' ? form.password : undefined,
      submit
    )

    if (fieldError) {
      //오류가 있는데 빈 문자열로 덮는거 방지
      error[key] = fieldError
    }
  }

  if (submit && form.gender === '') {
    error['gender'] = '성별을 선택해주세요'
  }
  return error
}

export default validateAll
