// 2025. 1. 10. 형식으로 반환
export function birthdayFormat(dateValue: string): string {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 0부터 시작하므로 +1
  const day = date.getDate()

  return `${year}. ${month}. ${day}.`
}

// 2025년 1월 형식으로 반환 (가입일에 씀)
export function yearMonthFormat(dateValue: string): string {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${year}년 ${month}월`
}
