import RestoreModal from './RestoreModal'
import Button from '../common/Button'
import { restoreDateFormat } from '../../utils/dateFormat'

interface Props {
  onNext: () => void
  onClose: () => void
  date: string
}

export default function RestoreStart({ onNext, onClose, date }: Props) {
  return (
    <RestoreModal
      title="해당 계정은 탈퇴된 상태예요"
      subtitle={[
        `${restoreDateFormat(date)} 이후, 계정 정보는 완전히 삭제돼요.`,
        '계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.',
      ]}
      footer={
        <Button size="freeLogin" onClick={onNext}>
          계정 다시 사용하기
        </Button>
      }
      onClose={onClose}
    />
  )
}
