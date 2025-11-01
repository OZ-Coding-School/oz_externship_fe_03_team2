type ValidationField = 'currentPassword' | 'newPassword' | 'confirmPassword'

// 비밀번호 유효성 검사-  8~15자, 대소문자+숫자+특수문자 포함 필수
export const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
  return passwordRegex.test(password)
}

export const validatePasswordChangeField = (
  field: ValidationField,
  value: string,
  formData?: { newPassword: string; confirmPassword: string }
): { isValid: boolean; errorMessage: string } => {
  switch (field) {
    case 'currentPassword':
      if (!value) {
        return { isValid: false, errorMessage: '현재 비밀번호를 입력하세요' }
      }
      return { isValid: true, errorMessage: '' }

    case 'newPassword':
      if (!value) {
        return { isValid: false, errorMessage: '새 비밀번호를 입력하세요' }
      }
      if (!isValidPassword(value)) {
        return {
          isValid: false,
          errorMessage: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
        }
      }
      return { isValid: true, errorMessage: '' }

    case 'confirmPassword':
      if (!value) {
        return { isValid: false, errorMessage: '비밀번호 확인을 입력하세요' }
      }
      if (value !== formData?.newPassword) {
        return {
          isValid: false,
          errorMessage: '새 비밀번호가 일치하지 않습니다',
        }
      }
      return { isValid: true, errorMessage: '' }

    default:
      return { isValid: true, errorMessage: '' }
  }
}
