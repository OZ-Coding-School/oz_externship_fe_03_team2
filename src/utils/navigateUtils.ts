export function handleExternalUrl(url: string): boolean {
  if (url.startsWith('http')) {
    window.location.href = url
    return true
  }
  return false
}
