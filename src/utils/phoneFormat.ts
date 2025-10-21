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
