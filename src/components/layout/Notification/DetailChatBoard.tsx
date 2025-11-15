import { ArrowLeft, ChevronDown, Send, X } from 'lucide-react'
import { useUserStore } from '../../../store/useUserStore'
import { timeFormat } from '../../../utils/dateFormat'
import { PeopleBoard } from './PeopleBoard'
import { useEffect, useRef, useState } from 'react'
import { useChatMessages } from '../../../api/services/Chat'
import { useStudyGroupId } from '../../../store/useStudyGroupId'
import { useWebSocketStore } from '../../../store/useWebSocketStore'
import Filter from 'badwords-ko'

interface ChatDetailType {
  studyGroupName: string | null
  setChatOpen: (chatOpen: boolean) => void
}
export function ChatDetail({ studyGroupName, setChatOpen }: ChatDetailType) {
  const { studyGroupUuid, setStudyGroupUuid } = useStudyGroupId()
  const {
    data: chatData,
    // 평범한.. 걍 데이터
    fetchNextPage,
    // 다음 페이지 패치해오기
    hasNextPage,
    // 다음 페이지 있나 없나
    isFetchingNextPage,
    // 다음 페이지 가져오는 중이냐 아니냐
    // 우리집 문서 참고..ㄱ
  } = useChatMessages(studyGroupUuid)
  const { sendMessage, isError, error, onlineUsers, onlineCount } =
    useWebSocketStore()

  const messages = chatData?.pages.flatMap((page) => page) ?? []

  const { user } = useUserStore()
  const [openPeople, setOpenPeople] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filter = new Filter()
  filter.addWords('ㅅㅂ', 'ㅂㅅ', 'ㅈㄴ', 'ㄷㅊ')

  const handleScroll = () => {
    const div = scrollRef.current
    if (!div || isFetchingNextPage) return

    // 맨 위 근처까지 스크롤 올리면 이전 페이지 가져옴
    if (div.scrollTop < 50 && hasNextPage) {
      const prevHeight = div.scrollHeight
      // 새 데이터 추가 전의 전체 높이
      fetchNextPage().then(() => {
        // 새 데이터 로드 후에도 원래 있던 스크롤 위치 유지 (튐 방지)
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            const newHeight = scrollRef.current.scrollHeight
            // 새 데이터 추가 후의 높이
            scrollRef.current.scrollTop = newHeight - prevHeight
            // newHeight-preHeight = 새로 추가된 애들이 차지하는 높이
            // 그만큼 밑으로 내려줌
          }
          //만약 원래 보던 곳이 맨 위에 있던 1000번째 메시지였는데 데이터가 위쪽에 새로 들어와서 100개가 추가되고 그 높이만큼 밑으로 밀리겠지 ? => 그럼 나는 900번째를 보게 되겠지.. 추가된만큼 밑으로 내려와야 됨.. 원래 위치가 맨 위였으니 추가된만큼 내려오기..
        })
      })
    }
  }

  // 딱 처음 들어갔을 때 맨 밑에 최신메시지 보이게
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatData])

  const CSS = {
    me: 'bg-primary-500 text-white rounded-xl rounded-br-sm',
    you: 'bg-gray-100 rounded-xl rounded-bl-sm',
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    // 빈 메시지나 띄어쓰기만 있는 거 전송 막음

    const cleanedMessage = filter.clean(message.trim())

    if (sendMessage && sendMessage(cleanedMessage)) {
      setMessage('')
      // 전송 시 결과를 true/false로 반환, 성공 시 입력창 초기화
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return
    }
    // 이거 왜 넣었냐면 IME (Input Method Editor = 한글 조합 엔진) 때문임.
    // 넣기 전에는 '안녕하세요'를 입력하고 엔터 치면 '안녕하세요', '요' 이렇게 두 개가 보내졌었음.
    // 왜냐하면 한글에는 초성/중성/종성이 있는데, '요'까지 쳤을 때 브라우저는 조합이 끝났는지 아닌지 모름. (안녕하세용 하면 조합이 끝났기 때문에 정상적으로 보내짐)
    // 그래서 만약 사용자가 엔터를 한 번 누르면, IME가 글자 조합을 끝내라는 신호를 보냄.
    // preventDefault()는 브라우저의 기본 동작을 막아 주는데, 얘는 실제 브라우저의 이벤트가 아니기 때문에 막을 수 없음.
    // '안녕하세요'를 작성하고 엔터를 누르고 있으면 ? IME가 '요'가 조합이 끝났다고 판단,
    // 이후 실제 엔터 이벤트를 또 보냄 -> 메시지가 보내지고 입력창이 비워지며, 새 입력 준비를 함
    // 여기서 리액트 내부에서 '아 이제 조합이 막 끝났네?' 하면서 이미 확정된 '요'를 조합된 결과라고 생각하고 입력창에 넣음
    // 그리고 엔터키가 떼어지기 전에 = Enter키 이벤트가 아직 유효한 동안 한 번 더 보내지는 것..
    // =========
    // e.nativeEvent.isComposing이 true면 => 지금 Enter는 글자 조합용이고, 메시지 전송용이 아니다 라고 판단해서 무시하는 것.

    if (e.key === 'Enter' && !e.shiftKey) {
      // 쉬프트+엔터 눌렀을 때는 줄바꿈 할 수 있도록  안 되게 함
      e.preventDefault()
      // 원래 엔터 누르면 줄바꿈인데 여기서는 대신 전송하게끔 함
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      {/* 상단바 */}
      <div className="flex items-center justify-between bg-gray-50 p-3">
        <div className="flex items-center gap-4">
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
            <ArrowLeft size={18} onClick={() => setStudyGroupUuid(null)} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{studyGroupName}</p>
            <div className="flex items-center gap-1">
              <div className="bg-success-500 h-2 w-2 rounded-full"></div>
              <p className="text-xs text-gray-600">{onlineCount}명 온라인</p>
            </div>
          </div>
        </div>
        <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X
            size={18}
            onClick={() => {
              setChatOpen(false)
              setStudyGroupUuid(null)
            }}
          />
        </div>
      </div>

      <div className="relative flex justify-between gap-2 border-y border-gray-200 bg-gray-50 p-2 whitespace-nowrap">
        <div className="flex h-full items-center gap-2">
          {onlineUsers.slice(0, 4).map((person) => (
            <div
              key={person.id}
              className="flex h-auto w-auto flex-0 items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
            >
              <div className={`bg-success-500 h-2 w-2 rounded-full`}></div>
              <p
                className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'} text-xs`}
              >
                {person.nickname}
              </p>
            </div>
          ))}
        </div>
        {onlineCount > 4 && (
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
            <ChevronDown onClick={() => setOpenPeople(true)} />
          </div>
        )}
        {openPeople && (
          <div className="absolute top-0 right-0">
            <PeopleBoard
              setOpenPeople={setOpenPeople}
              onlineCount={onlineCount}
              onlineUsers={onlineUsers}
            />
          </div>
        )}
      </div>

      {/* 채팅내역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex flex-1 flex-col gap-3.5 overflow-y-scroll p-3"
      >
        {!messages || messages.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            대화 내역이 없습니다.
          </div>
        ) : (
          messages
            .filter((msg) => msg && msg.sender && msg.id)
            .map((msg) => {
              const isMe = Number(msg.sender.id) === user?.id
              if (
                msg.type === 'system_message' ||
                msg.type === 'force_disconnect'
              ) {
                return (
                  <div
                    key={msg.id}
                    className="bg-primary-500 flex h-5 w-auto items-center justify-center rounded-full px-3 py-2 text-xs text-white opacity-50"
                  >
                    {msg.content}
                  </div>
                )
              }

              return (
                <div key={msg.id}>
                  {/* 메시지 */}
                  <div
                    className={`${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}
                  >
                    {!isMe && (
                      <p className="text-xs text-gray-500">
                        {msg.sender.nickname}
                      </p>
                    )}
                    <div
                      className={`${isMe ? CSS.me : CSS.you} max-w-[80%] px-3 py-2 text-sm`}
                    >
                      {msg.content}
                    </div>
                    <p className="text-xs text-gray-500">
                      {timeFormat(msg.created_at)}
                    </p>
                  </div>
                </div>
              )
            })
        )}
      </div>

      {error && (
        <div className="bg-danger-50 border-danger-200 border-t px-3 py-2">
          <p className="text-danger-600 text-xs">{error}</p>
        </div>
      )}

      {/* 입력창 */}
      <div className="border-secondary-200 flex items-center justify-center gap-2 border-t p-3">
        <input
          type="text"
          className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isError}
        />
        <div
          onClick={handleSendMessage}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400 active:bg-gray-500"
        >
          <Send size={18} />
        </div>
      </div>
    </div>
  )
}
