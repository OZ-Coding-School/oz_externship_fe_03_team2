export function timeFormat(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${minutes}:${sec.toString().padStart(2, '0')}`
}
