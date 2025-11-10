//  api 별점 문자열 > 숫자로 변환
export const ratingToNumber = (rating: string): number => {
  const ratingMap: Record<string, number> = {
    '1_OUT_OF_5_STARS': 1,
    '2_OUT_OF_5_STARS': 2,
    '3_OUT_OF_5_STARS': 3,
    '4_OUT_OF_5_STARS': 4,
    '5_OUT_OF_5_STARS': 5,
  }

  return ratingMap[rating] ?? 0
}
