// GET 요청은 useQuery 이용
// queryKey, queryFn: 인자로 필수값
// queryKey를 설정해 놓으면, api 요청을 통해 받아온 데이터를 그 이름을 가진 key로 캐싱됨.
// 이후 같은 이름의 api를 요청하면 ? 새로 불러오지 않고 기존에 불러놨던 캐싱된 데이터를 가져올 수 있음.
// api호출함수에다가 파라미터 데이터를 넣음
// const { data } = useCheckNickname('winter', true) 이런 식으로 호출
// - - - - - - - - - -
// export const 함수이름 = (매개변수: 타입) => {
//    return  useQuery<타입> ({
//        queryKey: []
//        queryFn: () => api.메서드(`/엔드포인트/${파라미터}`) <== api호출문에다가 데이터 전달해야됨
//        enabled: 호출 안 하는 조건,
//        staleTime: 캐싱 지속할 시간,
//        retry: 실패 시 다시 시도할 횟수
//    })
// }
// =========================================
// =========================================
// 그 외 요청은 useSimpleMutation 씌워서 이용
// useMutation 훅 중 속성 mutate()에다가 넣음
// query문 작성할 때도 mutation함수에다가 data 전달함
// +
// (useMutation을 쓰면 mutate(실제 요청을 실행하는 함수), mutateAsync(Promise반환하여 await도 가능), isLoading/isError/isSuccess상태값 등을 반환함.)
// mutate는 인자를 하나만 받을 수 있어서, mutate에다가 여러 개의 데이터를 전달하려면 객체에다가 내용을 담아서 => 객체 하나로만 전달해야됨. (ex: updateInquiryMutate({ id: 5, payload: { title: "수정" } }) )
// 그래서 api 명세서 보고 인자를 여러 개 넘겨줘야 한다 하면 훅에서도 받은 객체를 분해해서 써야 함.
// - - - - - - - - - -
// export const 함수이름 = () => {
//    return useSimpleMutation<타입>(
//      (data) => api.메서드(`/엔드포인트`, data),
//      {
//        onSuccess: () => {}
//      }
//    )
// }
export const useSignup = () => {
  return
}
