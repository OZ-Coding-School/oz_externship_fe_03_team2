import { useState } from 'react'
import Button from './common/Button'
import { allData, notReadData, readData } from './NotiDummy'
import { Link } from 'react-router'

export function NotiBoard() {
  const [mode, setMode] = useState<string>('all')
  const sortAllData = allData.items.sort((a, b) => {
    return Number(a.is_read) - Number(b.is_read)
  })
  const filterData =
    mode === 'all'
      ? sortAllData
      : mode === 'notRead'
        ? notReadData.items
        : readData.items

  return (
    <div className="flex flex-col">
      <div className="m-1 flex w-full justify-between">
        <p>알림</p>
        <Button variant="text">모두 읽음</Button>
      </div>
      <div className="flex border-x">
        <div className={`${mode === 'all' && 'border-b'}`}>
          <p onClick={() => setMode('all')}>전체보기 ({allData.total})</p>
        </div>
        <div className={`${mode === 'notRead' && 'border-b'}`}>
          <p onClick={() => setMode('notRead')}>
            읽지 않음 ({notReadData.total})
          </p>
        </div>
        <div className={`${mode === 'read' && 'border-b'}`}>
          <p onClick={() => setMode('read')}>읽음 ({readData.total})</p>
        </div>
      </div>
      <div>
        {filterData?.map((item) => (
          <div key={item.id}>
            <Link to={item.link_url}>{item.message}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
