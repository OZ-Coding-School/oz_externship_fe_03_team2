import { useState } from 'react'
import Button from './common/Button'
import { allData, notReadData, readData } from './NotiDummy'

export function NotiBoard() {
  const [mode, setMode] = useState('all')
  return (
    <div>
      <div className="m-1 flex w-full justify-between">
        <p>알림</p>
        <Button variant="text">모두 읽음</Button>
      </div>
      <div>
        <div className={`${(mode = 'all' && 'border-b')}`}>
          <p>전체보기 ({allData.total})</p>
        </div>
        <div>
          <p>읽지 않음 ({notReadData.total})</p>
        </div>
        <div>
          <p>읽음 ({readData.total})</p>
        </div>
      </div>
    </div>
  )
}
