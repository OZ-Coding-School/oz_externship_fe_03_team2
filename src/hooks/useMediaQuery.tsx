import { useState, useEffect } from 'react'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false) //현재 화면이 미디어쿼리 조건에 맞는지 저장

  useEffect(() => {
    const media = window.matchMedia(query) // 768px 이상 같은 조건을 확인함

    if (media.matches !== matches) setMatches(media.matches)

    const listener = () => setMatches(media.matches) //  화면 크기 변할때 마다 호출될 함수
    media.addEventListener('change', listener) // 화면 크기 변화 감지 시작

    return () => media.removeEventListener('change', listener) //클린업함수 > 언마운트시 감지 중지 (메모리누수 방지)
  }, [matches, query])

  return matches
}

export default useMediaQuery
