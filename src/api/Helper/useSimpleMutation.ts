import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSimpleMutation<
  T = unknown,
  TError = Error,
  TVariables = void,
  // 인라인으로 타입 지정하는 게 더러워보여도 이렇게 하는 게 나음
  // 인터페이스에서 하면 제네릭으로 지정이 안 되고
  // 그 순간에 타입 추론이 되어버려서..
>(
  mutationFn: (variables: TVariables) => Promise<T>,
  options?: {
    invalidateKeys?: string[]
    removeKeys?: string[]
    onSuccess?: (data: T, variables: TVariables) => void
    onError?: (error: TError) => void
    onSettled?: (
      data: T | undefined,
      error: TError | null,
      variables: TVariables
    ) => void
  }
) {
  const queryClient = useQueryClient()
  const {
    invalidateKeys = [],
    removeKeys = [],
    ...mutationOptions
  } = options || {}
  // options가 undefined일 떄도 빈 객체를 기본값으로 지정 => 구조분해할 때 오류 안나게끔...

  return useMutation<T, TError, TVariables>({
    // useMutation을 호출하면서 넣은 내용 전달함
    mutationFn,
    onSuccess: (data, variables) => {
      invalidateKeys.forEach((key) => {
        // 캐시 무효화. (ex: 내용 변경 후 재조회)
        // invalidateKeys 배열을 순회하면서 각 키마다 캐시 무효화 실행함.
        // ex:
        // useSimpleMutation(loginApi, {
        //   invalidateKeys: ['/v1/me', '/posts'], <= 얘네 배열
        // })
        queryClient.invalidateQueries({ queryKey: [key] })
      })

      removeKeys.forEach((key) => {
        // 캐시 삭제 (ex: 로그아웃)
        queryClient.removeQueries({ queryKey: [key] })
      })

      mutationOptions.onSuccess?.(data, variables)
      // 미리 정의해 둔 onSuccess의 콜백이 있으면 실행, 없으면 말고..
      // ex:
      // onSuccess: () => navigate('/')
    },
    onError: mutationOptions.onError,
    // ex:
    // useSimpleMutation(loginApi, {
    //   onError: (error) => {
    //   console.error('로그인 실패:', error)
    // }
    onSettled: mutationOptions.onSettled,
    // 성공/실패 여부와 관계 없이 무조건 실행하는 내용.
  })
}
