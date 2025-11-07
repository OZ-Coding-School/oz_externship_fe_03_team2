import { ArrowLeft, ChevronDown, Send, X } from 'lucide-react'
// import { useChatDetail } from '../../../api/services/Chat'
import { useUserStore } from '../../../store/useUserStore'
import { online } from '../../NotiDummy'
import { timeFormat } from '../../../utils/dateFormat'
import { PeopleBoard } from './PeopleBoard'
import { useEffect, useRef, useState } from 'react'
import { useChatMessages } from '../../../api/services/Chat'

interface ChatDetailType {
  studyGroupName: string | null
  studyGroupId: number
  selectedRoomUuid: string
  setSelectedRoomUuid: (selectedRoomUuid: string | null) => void
  setChatOpen: (chatOpen: boolean) => void
}
export function ChatDetail({
  studyGroupName,
  studyGroupId,
  selectedRoomUuid,
  setSelectedRoomUuid,
  setChatOpen,
}: ChatDetailType) {
  const { data: chatData } = useChatMessages(selectedRoomUuid, studyGroupId)
  const messages = chatData?.pages.flatMap((page) => page) ?? []

  const { user } = useUserStore()
  const [openPeople, setOpenPeople] = useState<boolean>(false)
  const [sendMessage, setSendMessage] = useState<string>('')
  // const chatData = chatMessagesData_10
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatData])

  const CSS = {
    me: 'bg-primary-500 text-white rounded-xl rounded-br-sm',
    you: 'bg-gray-100 rounded-xl rounded-bl-sm',
  }

  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      {/* 상단바 */}
      <div className="flex items-center justify-between bg-gray-50 p-3">
        <div className="flex items-center gap-4">
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
            <ArrowLeft size={18} onClick={() => setSelectedRoomUuid(null)} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{studyGroupName}</p>
            <div className="flex items-center gap-1">
              <div className="bg-success-500 h-2 w-2 rounded-full"></div>
              <p className="text-xs text-gray-600">{online.total}명 온라인</p>
            </div>
          </div>
        </div>
        <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X size={18} onClick={() => setChatOpen(false)} />
        </div>
      </div>

      {/* 접속중 온라인 여부 어케 되나 */}
      <div className="relative flex justify-between gap-2 border-y border-gray-200 bg-gray-50 p-2 whitespace-nowrap">
        <div className="flex h-full items-center gap-2">
          {online.people.slice(0, 4).map((person) => (
            <div
              key={person.id}
              className="flex h-auto w-auto flex-0 items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
            >
              <div
                className={`${person.is_online ? 'bg-success-500' : 'bg-gray-300'} h-2 w-2 rounded-full`}
              ></div>
              <p
                className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'} text-xs`}
              >
                {person.name}
              </p>
            </div>
          ))}
        </div>
        {online.people.length > 4 && (
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
            <ChevronDown onClick={() => setOpenPeople(true)} />
          </div>
        )}
        {openPeople && (
          <div className="absolute top-0 right-0">
            <PeopleBoard setOpenPeople={setOpenPeople} />
          </div>
        )}
      </div>

      {/* 채팅내역 */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex flex-1 flex-col gap-3.5 overflow-x-scroll p-3"
      >
        {!messages || messages.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            대화 내역이 없습니다.
          </div>
        ) : (
          messages?.map((msg) => {
            const isMe = msg.sender.id === user?.id

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

      {/* 입력창 */}
      <div className="border-secondary-200 flex items-center justify-center gap-2 border-t p-3">
        <input
          type="text"
          className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400 active:bg-gray-500">
          <Send size={18} />
        </div>
      </div>
    </div>
  )
}

// import { ArrowLeft, ChevronDown, Send, X } from 'lucide-react'
// // import { useChatDetail } from '../../../api/services/Chat'
// import { useUserStore } from '../../../store/useUserStore'
// import {
//   chatMessagesData_10,
//   chatMessagesData_20,
//   chatMessagesData_5,
//   online,
// } from '../../NotiDummy'
// import { timeFormat } from '../../../utils/dateFormat'
// import { PeopleBoard } from './PeopleBoard'
// import { useEffect, useRef, useState } from 'react'

// interface ChatDetailType {
//   studyGroupName: string | null
//   setChatOpen: (chatOpen: boolean) => void
//   selectedRoomUuid: string
//   setSelectedRoomUuid: (selectedRoomUuid: string | null) => void
// }
// export function ChatDetail({
//   studyGroupName,
//   setChatOpen,
//   selectedRoomUuid,
//   setSelectedRoomUuid,
// }: ChatDetailType) {
//   // const { data: chatData } = useChatDetail(studyGroupId)
//   const { user } = useUserStore()
//   const [openPeople, setOpenPeople] = useState<boolean>(false)
//   const [sendMessage, setSendMessage] = useState<string>('')
//   const chatData = chatMessagesData_10

//   const lastReadMessageRef = useRef<HTMLDivElement>(null)
//   // '여기까지읽음' 표시선 가리키는 ref..
//   const scrollRef = useRef<HTMLDivElement>(null)
//   // 채팅 내역 감싼 div 가리키는 ref..
//   //마지막으로 읽은 위치로 이동하게 만들 ref..

//   const lastReadIndex = chatData?.data?.messages.findIndex(
//     (msg) => !msg.is_read
//   )
//   // 안 읽은 메시지 중에 가장 오래된 거 찾기.. 안읽은 메시지가 가장 처음 나오는 순서
//   // 안 읽은 메시지가 없으면 -1 반환.

//   useEffect(() => {
//     if (lastReadIndex !== -1 && lastReadMessageRef.current) {
//       // 안 읽은 메시지가 있을 때는 그 위치로 이동
//       lastReadMessageRef.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'center',
//         // 해당 요소를  중앙에 위치시키게끔..
//       })
//     } else if (scrollRef.current) {
//       // 전부 읽은 상태는 맨 아래로 이동
//       const scrollDiv = scrollRef.current
//       scrollDiv.scrollTop = scrollDiv.scrollHeight
//       // scrollTop : 현재 스크롤의 세로 위치
//       // scrollHeight : 스크롤 가능한 총 높이
//       // => 현재스크롤바를 맨 아래로 옮겨라. = 가장 최신 메시지로 이동해라
//     }
//   }, [chatData])

//   const CSS = {
//     me: 'bg-primary-500 text-white rounded-xl rounded-br-sm',
//     you: 'bg-gray-100 rounded-xl rounded-bl-sm',
//   }

//   return (
//     <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
//       {/* 상단바 */}
//       <div className="flex items-center justify-between bg-gray-50 p-3">
//         <div className="flex items-center gap-4">
//           <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
//             <ArrowLeft size={18} onClick={() => setSelectedRoomUuid(null)} />
//           </div>
//           <div className="flex flex-col">
//             <p className="font-semibold text-sm">{studyGroupName}</p>
//             <div className="flex items-center gap-1">
//               <div className="bg-success-500 h-2 w-2 rounded-full"></div>
//               <p className="text-xs text-gray-600">{online.total}명 온라인</p>
//             </div>
//           </div>
//         </div>
//         <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
//           <X size={18} onClick={() => setChatOpen(false)} />
//         </div>
//       </div>

//       {/* 접속중 온라인 여부 어케 되나 */}
//       <div className="relative flex justify-between gap-2 border-y border-gray-200 bg-gray-50 p-2 whitespace-nowrap">
//         <div className="flex h-full items-center gap-2">
//           {online.people.slice(0, 4).map((person) => (
//             <div
//               key={person.id}
//               className="flex h-auto w-auto flex-0 items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
//             >
//               <div
//                 className={`${person.is_online ? 'bg-success-500' : 'bg-gray-300'} h-2 w-2 rounded-full`}
//               ></div>
//               <p
//                 className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'} text-xs`}
//               >
//                 {person.name}
//               </p>
//             </div>
//           ))}
//         </div>
//         {online.people.length > 4 && (
//           <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
//             <ChevronDown onClick={() => setOpenPeople(true)} />
//           </div>
//         )}
//         {openPeople && (
//           <div className="absolute top-0 right-0">
//             <PeopleBoard setOpenPeople={setOpenPeople} />
//           </div>
//         )}
//       </div>

//       {/* 채팅내역 */}
//       <div
//         ref={scrollRef}
//         className="scrollbar-hide flex flex-1 flex-col gap-3.5 overflow-x-scroll p-3"
//       >
//         {chatData?.data.pagination.total_count === 0 ? (
//           <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
//             대화 내역이 없습니다.
//           </div>
//         ) : (
//           chatData?.data.messages.map((msg, idx) => {
//             const isMe = msg.sender_id === user?.id
//             const isLastRead = idx === lastReadIndex - 1

//             return (
//               <div key={msg.id}>
//                 {/* 마지막으로 읽은 메시지가 어딘지 알려주는 그 구분선.. */}
//                 {isLastRead && lastReadIndex !== -1 && (
//                   <div
//                     ref={lastReadMessageRef}
//                     className="my-4 flex items-center gap-2"
//                   >
//                     <div className="bg-primary-500 h-px flex-1"></div>
//                     <span className="text-primary-600 text-xs font-medium whitespace-nowrap">
//                       여기까지 읽음
//                     </span>
//                     <div className="bg-primary-500 h-px flex-1"></div>
//                   </div>
//                 )}

//                 {/* 메시지 */}
//                 <div
//                   className={`${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}
//                 >
//                   {!isMe && (
//                     <p className="text-xs text-gray-500">
//                       {msg.sender_nickname}
//                     </p>
//                   )}
//                   <div
//                     className={`${isMe ? CSS.me : CSS.you} max-w-[80%] px-3 py-2 text-sm`}
//                   >
//                     {msg.content}
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     {timeFormat(msg.created_at)}
//                   </p>
//                 </div>
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* 입력창 */}
//       <div className="border-secondary-200 flex items-center justify-center gap-2 border-t p-3">
//         <input
//           type="text"
//           className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
//           placeholder="메시지를 입력하세요..."
//           value={sendMessage}
//           onChange={(e) => setSendMessage(e.target.value)}
//         />
//         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400 active:bg-gray-500">
//           <Send size={18} />
//         </div>
//       </div>
//     </div>
//   )
// }
