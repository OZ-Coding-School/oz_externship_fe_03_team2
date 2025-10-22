// GET 요청은 useQuery 이용
// useQUery 호출하면서
// - - - - - - - - - -
//  useQuery<타입> ({
//    queryKey: []
//    queryFn: () => api.메서드(`url/${파라미터}`)
//    enabled: 호출 안 하는 조건,
//    staleTime: 캐싱 지속할 시간,
//    retry: 실패 시 다시 시도할 횟수
//  })

// 그 외 요청은 useSimpleMutation 씌워서 이용
//

export const useSignup = () => {
  return
}
