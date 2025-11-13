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

// 2025. 10. 28. 오전 11:11 형식
export function fullDateFormat(dateValue: string): string {
  const date = new Date(dateValue)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  const displayHours = String(hours % 12 || 12).padStart(2, '0')

  return `${year}. ${month}. ${day}. ${period} ${displayHours}:${minutes}`
}

// 시작일과 종료일을 받아 개월 수를 계산 (3개월 or 1개월 미만일땐 3일)
export const calculateDurationFormat = (
  startDate: string,
  endDate: string
): string => {
  if (!startDate || !endDate) return '-'

  const start = new Date(startDate)
  const end = new Date(endDate)

  const timeDifferenceInMs = Math.abs(end.getTime() - start.getTime()) // 두 날짜의 시간 차이를 초로 계산

  const totalDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24)) // 초를 일수로 변환 > ceil 올림 처리 (1.2일 > 2일)

  if (totalDays < 30) return `${totalDays}일`

  const totalMonths = Math.round(totalDays / 30) // round로 반올림 (1.4개월 > 1개월, 1.6개월 > 2개월)
  return `${totalMonths}개월`
}

export const chatDateFormat = (dateValue: string): string => {
  const date = new Date(dateValue)

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  const displayHours = hours % 12 || 12

  return `${month}월 ${day}일 ${period} ${displayHours}:${minutes}`
}

export const notificationDateFormat = (dateValue: string): string => {
  const date = new Date(dateValue)

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${month}월 ${day}일`
}
