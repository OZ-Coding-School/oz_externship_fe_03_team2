export const phoneFormat = (value: string): string => {
  if (!value) return ''

  const numbers = value.replace(/\D/g, '') // 숫자만 추출

  const limitedNumbers = numbers.slice(0, 11) // 최대 11자리까지만 허용

  if (limitedNumbers.length <= 3) {
    return limitedNumbers // 길이에 따라 자동 포맷팅
  }

  if (limitedNumbers.length <= 7) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}` // 길이에 따라 자동 포맷팅
  }

  return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
}

// 모든 숫자가 아닌 문자 제거
export const removePhoneFormat = (value: string): string => {
  return value.replace(/\D/g, '')
}

// 010으로 시작하고 11자리 숫자인지 확인
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = removePhoneFormat(phone)
  return /^010\d{8}$/.test(cleaned)
}
