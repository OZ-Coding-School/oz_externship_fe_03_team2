// 2025. 1. 10. 형식으로 반환
export function birthdayFormat(dateValue: string): string {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 0부터 시작하므로 +1
  const day = date.getDate()

  return `${year}. ${month}. ${day}.`
}

// 2025-1-10 형식으로 반환
export function birthdayFormat2(dateValue: string): string {
  if (!dateValue) return ''
  const onlyNum = dateValue.replace(/\D/g, '').slice(0, 8)

  const y = onlyNum.slice(0, 4)
  const m = onlyNum.slice(4, 6)
  const d = onlyNum.slice(6, 8)

  if (onlyNum.length <= 4) {
    return y
  } else if (onlyNum.length <= 6) {
    return `${y}-${m}`
  } else {
    return `${y}-${m}-${d}`
  }
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

// 시작일과 종료일을 받아 개월 수를 계산 (3개월 이런식)
export const calculateDurationFormat = (
  startDate: string,
  endDate: string
): string => {
  if (!startDate || !endDate) return '-'

  const start = new Date(startDate)
  const end = new Date(endDate)
  const months = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
  )

  return `${months}개월`
}
