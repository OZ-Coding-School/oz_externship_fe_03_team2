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
//
// 그 외 요청은 useSimpleMutation 씌워서 이용
// useMutation 훅 중 속성 mutate()에다가 넣음
// query문 작성할 때도 mutation함수에다가 data 전달함
// +
// (useMutation을 쓰면 mutate(실제 요청을 실행하는 함수), mutateAsync(Promise반환하여 await도 가능), isLoading/isError/isSuccess상태값 등을 반환함.)
// mutate는 인자를 하나만 받을 수 있어서, mutate에다가 여러 개의 데이터를 전달하려면 객체에다가 내용을 담아서 => 객체 하나로만 전달해야됨. (ex: updateInquiryMutate({ id: 5, payload: { title: "수정" } }) )
// 그래서 api 명세서 보고 인자를 여러 개 넘겨줘야 한다 하면 훅에서도 받은 객체를 분해해서 써야 함.
// - - - - - - - - - -
// export const 함수이름 = () => {
//    return useSimpleMutation<T: 응답데이터 타입, TError: 에러 타입, TVariables: 요청데이터 타입>(
//      (data) => api.메서드(`/엔드포인트`, data),
//      {
//        onSuccess: () => {}
//      }
//    )
// }

import { useSimpleMutation } from '../useSimpleMutation'
import { api } from '../client'
import Toast from '../../components/common/toast/Toast'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import * as T from '../interface/authInterface'
// 인터페이스를 다른 파일로 뻈으니 그걸 하나하나 import 해오려면 너무너무 길어짐...
// 저 파일의 모듈 전체를 T라는 네임스페이스로 묶어서 ?
// 모든 타입들을 T.접두사 붙여가지고 import해오는 거임
export const showToast = (
  message: string,
  type: 'error' | 'warning' | 'success',
  title?: string
) => {
  toast.custom((t) => (
    <Toast id={t} title={title} message={message} type={type} />
  ))
}

// 회원가입
export const useSignup = () => {
  const navigate = useNavigate()

  return useSimpleMutation<
    T.SignupResponse,
    T.ComplexErrors,
    T.SignupRequestBody
  >((body) => api.post('/users', body), {
    onSuccess: () => {
      showToast('로그인을 시도해주세요.', 'success', '회원가입에 성공했습니다')
      navigate('/login')
    },
  })
}

// 닉네임 중복 확인
export const useCheckNickname = (nickname: string, enabled = false) => {
  // 굳이 enabled = false를 내려주는 이유가 뭘까?
  // 사실 안 내려도 밑에 옵션에서 닉네임을 입력했을 때만 함수가 실행되도록 해서 안 써도 됨
  // 하지만 ? 쿼리 실행 여부를 컴포넌트로 직접 제어하려면 매개변수에 넣어야 됨
  // '중복확인' 버튼을 눌러야 쿼리를 실행시키고 싶다면 아래처럼...
  // refetch는 enabled가 true인지 false인지와 관계 없이 조건만 맞으면 쿼리를 실행함.
  // 그래서 '중복확인' 버튼에 refetch를 달면 ? 버튼 눌렀을 때 즉시 실행됨.
  // const { data, refetch } = useCheckNickname(nickname, false)
  // <button onClick={() => refetch()}>중복확인</button>

  return useQuery<T.CheckNicknameResponse, T.SimpleError>({
    queryKey: ['/users/check-nickname', nickname],
    queryFn: () =>
      api.get(
        `/v1/users/check-nickname?nickname=${encodeURIComponent(nickname)}`
      ),
    enabled: enabled && nickname.length > 0,
    retry: false,
  })
}

export const usePhonePublicSendCode = () => {
  return useSimpleMutation<
    T.PhoneSendCodeResponse,
    T.SimpleError,
    T.PhonePublicSendCodeRequest
  >((body) => api.post('/phone-verifications/signup/send-code', body), {
    onSuccess: () => showToast('로그인을 시도해주세요.', 'success'),
  })
}
