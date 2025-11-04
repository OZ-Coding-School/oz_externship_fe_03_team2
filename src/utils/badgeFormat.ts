import type { BadgeVariant } from '../components/common/Badge'

// 첫 글자만 대문자, 나머지는 소문자로 변환
export const firstUppercaseFormat = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// 난이도 상수값을 한글로 변환
export const getDifficultyLabel = (
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
): string => {
  const difficultyMap: Record<'EASY' | 'NORMAL' | 'HARD', string> = {
    EASY: '초급',
    NORMAL: '중급',
    HARD: '고급',
  }
  return difficultyMap[difficulty]
}

// 난이도에 따른 Badge variant 반환 (EASY > 초급)
export const getDifficultyVariant = (
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
): 'success' | 'primary' | 'danger' => {
  const variantMap: Record<
    'EASY' | 'NORMAL' | 'HARD',
    'success' | 'primary' | 'danger'
  > = {
    EASY: 'success',
    NORMAL: 'primary',
    HARD: 'danger',
  }
  return variantMap[difficulty]
}

// 플랫폼에 따른 Badge variant 반환 (Inflearn > success)
export const getPlatformVariant = (platform: string): BadgeVariant => {
  return platform === 'Inflearn' ? 'success' : 'pupple'
}
