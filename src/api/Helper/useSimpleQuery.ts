import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

// useQuery > 데이터를 가져와서 캐싱(저장) = GET
// - 자동 실행 (컴포넌트 마운트 시)
// - 자동 캐싱 및 재사용
// - queryKey로 캐시 관리
export function useSimpleQuery<T = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, TError>, 'queryKey' | 'queryFn'>
  // useQuery로 가져올 수 있는 Query 속성들 중 이미 있는 data와 error를 제외한 나머지 속성들을 optional하게 가져옴.
) {
  return useQuery<T, TError>({
    queryKey,
    queryFn,
    ...options,
  })
}
