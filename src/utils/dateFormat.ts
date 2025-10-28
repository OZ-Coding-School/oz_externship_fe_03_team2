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

// 2025.10.28. 오전 11:11 형식
export function fullDateFormat(dateValue: string): string {
  const date = new Date(dateValue)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  const displayHours = hours % 12 || 12

  return `${year}.${month}.${day} ${period} ${displayHours}:${minutes}`
}
