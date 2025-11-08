import { useMemo, useState } from 'react'
// import { allData } from './NotiDummy'
import { Link } from 'react-router'
// import { monthDayFormat } from '../utils/dateFormat'
// import { useAllNotification } from '../api/services/Noti'
import { useSSE } from '../hooks/useSSE'
import {
  useAllNotification,
  useNotiPatchAllRead,
  useNotiPatchRead,
} from '../api/services/Noti'

export function NotiBoard() {
  const [mode, setMode] = useState<'all' | 'notRead' | 'read'>('all')
  const { data: allData } = useAllNotification()
  useSSE()

  const { mutate: patchRead } = useNotiPatchRead()
  const handleRead = (notification_id: number) => {
    patchRead(notification_id)
  }
  const { mutate: patchAllRead } = useNotiPatchAllRead()

  const filterData = useMemo(() => {
    if (!allData?.results) return []
    if (mode === 'all') {
      return [...allData.results].sort((a, b) => {
        return Number(a.is_read) - Number(b.is_read)
      })
    } else if (mode === 'notRead') {
      return allData.results.filter((data) => data.is_read === false)
    } else {
      return allData.results.filter((data) => data.is_read === true)
    }
  }, [allData, mode])

  const notReadCount =
    allData?.results.filter((data) => !data.is_read).length || 0
  const readCount = allData?.results.filter((data) => data.is_read).length || 0

  return (
    <div className="shadow-normal flex h-[550px] w-[450px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white select-none">
      <div className="y-15 m-1 flex w-full justify-between p-4">
        <p className="text-lg font-semibold">알림</p>
        <button
          onClick={() => patchAllRead()}
          className="text-primary-600 hover:text-primary-700 active:text-primary-800 text-sm"
        >
          모두 읽음
        </button>
      </div>
      <div className="flex justify-between border-y border-gray-200 text-sm">
        <div
          className={`${mode === 'all' ? 'text-primary-500 border-b-2' : 'text-gray-500'} flex w-full items-center justify-center p-3`}
        >
          <p onClick={() => setMode('all')}>전체보기 ({allData?.count})</p>
        </div>
        <div
          className={`${mode === 'notRead' ? 'text-primary-500 border-b-2' : 'text-gray-500'} flex w-full items-center justify-center p-3`}
        >
          <p onClick={() => setMode('notRead')}>읽지 않음 ({notReadCount})</p>
        </div>
        <div
          className={`${mode === 'read' ? 'text-primary-500 border-b-2' : 'text-gray-500'} flex w-full items-center justify-center p-3`}
        >
          <p onClick={() => setMode('read')}>읽음 ({readCount})</p>
        </div>
      </div>
      <div className="flex w-full flex-col overflow-y-scroll">
        {filterData?.map((item) => (
          <Link
            key={item.id}
            to={item.back_url_link}
            onClick={() => !item.is_read && handleRead(item.id)}
            className={`flex w-full border-b border-gray-100 ${!item.is_read && 'bg-primary-50'} gap-3 p-4`}
          >
            <div className="h-8 w-8 rounded-full bg-[#DBEAFE]">
              {/* 아이콘 */}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm">{item.content}</p>
              <p className="text-xs text-gray-500">
                {/* {monthDayFormat(item.created_at)} */}
                {/* 없어졌나? */}
              </p>
            </div>
            {!item.is_read && (
              <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
