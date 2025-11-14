import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import {
  type ChatRoomData,
  type ChatMessageData,
  type User,
  type WebSocketResponse,
} from '../types/apiInterface/chatInterface'
import { useStudyGroupId } from '../store/useStudyGroupId'
import { useToken } from '../store/useTokenStore'
import { showNotificationToast } from '../utils/showNotificationToast'
import { useUserStore } from '../store/useUserStore'

export const useWebSocket = (study_group_uuid: string | null) => {
  const socketRef = useRef<WebSocket | null>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [onlineCount, setOnlineCount] = useState<number>(0)

  const queryClient = useQueryClient()
  const { setStudyGroupUuid } = useStudyGroupId()
  const { accessToken } = useToken()
  const { user } = useUserStore()

  useEffect(() => {
    if (!study_group_uuid) return
    const wsUrl = `wss://api.ozcoding.site/ws/chat/${study_group_uuid}/?token=${accessToken}`

    const socket = new WebSocket(wsUrl)
    // 웹소켓 연결
    socketRef.current = socket

    socket.onopen = () => {
      setIsError(false)
      setError('')
    }

    socket.onmessage = (e) => {
      const response: WebSocketResponse = JSON.parse(e.data)
      // 여기서 e는 브라우저가 만든 메시지이벤트 객체임
      // MessageEvent {
      //   data: '{"type":"chat.message","data":{...}}',  // ← 서버가 보낸 실제 데이터
      //   type: 'message',         // ← 이벤트 타입 (웹소켓의 이벤트는 open / message / error / close 4종류
      //   target: WebSocket,
      //   timeStamp: 1234567890,   // ← 이벤트 발생 시간
      //   isTrusted: true,         // ← 보안 관련
      //   origin: 'ws://example.com',
      // }
      // 이 중에 data 부분을 찍고 들어가는 거
      if (response.type === 'online.users') {
        setOnlineCount(response.count)
        setOnlineUsers(response.users)
        return
      }
      if (response.type === 'force_disconnect') {
        socket.close()
        setStudyGroupUuid(null)
        return
      }
      if (response.type === 'error') {
        setError(response.message || 'WebSocket 에러')
        return
      }

      if (
        (response.type === 'chat.message' ||
          response.type === 'system_message') &&
        'id' in response &&
        response.id &&
        'sender' in response &&
        response.sender &&
        'content' in response &&
        response.content
      ) {
        const newMsg: ChatMessageData = {
          content: response.content,
          created_at: response.created_at,
          id: response.id,
          sender: response.sender,
          study_group_uuid: response.study_group_uuid,
          type: response.type,
        }

        // 변수에 안 담고 바로 ...prev, response.data 했더니
        // undefined일 수 있다고 오류 뜸
        // 변수에 할당하면 ? 그 순간에 타입이 확정돼서 undefined가 아니구나! 함
        //! 채팅목록 가져오는 api 나오면 인터페이스/탠스택 만들고 타입/쿼리키 연결해서
        //! 받아온 newMsg텍스트 캐시에 추가하는 로직 작성
        queryClient.setQueryData<InfiniteData<ChatMessageData[]>>(
          ['chatMessages', study_group_uuid],
          (old) => {
            if (!old) {
              return {
                pages: [[newMsg]],
                pageParams: [1],
              }
            }
            const newPages = [...old.pages]
            const lastPageIndex = newPages.length - 1
            newPages[lastPageIndex] = [...newPages[lastPageIndex], newMsg]
            return {
              ...old,
              pages: newPages,
            }
          }
        )
        queryClient.setQueryData<ChatRoomData[]>(['chatRooms'], (old) => {
          if (!old) return old
          return old.map((room) => {
            if (room.uuid === study_group_uuid) {
              return {
                ...room,
                last_message: {
                  id: newMsg.id,
                  content: newMsg.content,
                  sender_nickname: newMsg.sender.nickname,
                  created_at: newMsg.created_at,
                },
                unread_message_count: room.unread_message_count,
                updated_at: new Date().toISOString(),
              }
            }
            return room
          })
        })
        if (user?.id !== Number(newMsg.sender.id)) {
          showNotificationToast(
            newMsg.content,
            newMsg.sender.nickname,
            newMsg.created_at,
            'chat'
          )
        }
        setIsError(false)
      }
    }

    socket.onerror = () => {
      setIsError(true)
      setError('연결 오류')
      // = 네트워크 에러. 전송 시도 후에 네트워크에러로 전송 실패한 거 골라냄.
    }

    socket.onclose = () => {
      setIsError(false)
    }

    return () => {
      socket.close()
      // 컴포넌트 사라질 때 또는 다른 채팅방으로 옮길 때 실행되는 cleanup 함수임
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study_group_uuid])

  // 메시지 보내는 부분
  const sendMessage = (content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      // readyState: WebSocket 객체에 있는 기본 속성으로 연결 상태를 말함.  연결 중일 때만 전송해라..라는 뜻
      // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
      // ========
      // 기본 속성:
      // - binaryType
      //    : 텍스트 말고 파일 받으려면 *blob, **arraybuffer 등을 설정해야 함.
      //      socket.binaryType = 'blob' 이런 식으로 설정하고
      //      onmessage에서 data가 string인지 blob인지에 따라 다르게 처리하기.
      //      보낼 때는 따로 설정 안 하고 그냥 socket.send(file), socket.send(blob) 이렇게 하면 됨.
      //          * blob (Binary Large Object): 파일 같은 데이터 덩어리
      //          ** arrayBuffer: 원시 이진 데이터를 담는 객체. 바이트(0과 1) 덩어리를 직접 다루는 것
      // - bufferedAmount: 전송 대기 중인 데이터의 크기. 아직 네트워크로 전송되지 않고 큐에 있는 데이터의 바이트 수.
      // - extensions: 서버에서 선택한 확장을 반환함.
      // - protocol,
      // - readyState,
      // - url
      // =======
      // 메서드:
      // - close() : 연결  끊기
      // - send() : 보내기. 전송할 데이터를 큐에 등록하고 bufferedAmount를 필요한 만큼 증가시킴
      // =======
      // 이벤트 핸들러:
      // - onopen(연결 성공 시 호출)
      //        onclose = (event) => { }
      //        addEventListener("close", (event) => { })
      //            => 이 두가지 방식 모두 가능함.
      //               button.onclick 과    button.addEventListener('click', ...) 의  차이랑 똑같음.
      //               - on~은 하나만 등록 가능해서 마지막 것만 실행된다면,
      //               - addEventListener~는 둘 다 실행 가능함.
      //                    => add~는 엄~청 큰 프로젝트에서.. 분리된 모듈들이 독립적으로 처리해야 할 때 필요함.
      // - onerror(에러 발생)
      // - onmessage(메시지 받음)
      // - onclose(연결 종료)
      socketRef.current.send(
        JSON.stringify({
          type: 'chat.message',
          content: content,
        })
      )
      return true
    } else {
      setIsError(true)
      setError('연결 실패')
      return false
      // 전송 시도 전 연결상태에 따라 오류 판단
    }
  }
  return {
    sendMessage,
    isError,
    error,
    onlineUsers,
    onlineCount,
  }
}
