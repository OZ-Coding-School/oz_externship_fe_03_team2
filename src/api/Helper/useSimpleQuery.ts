import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

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
