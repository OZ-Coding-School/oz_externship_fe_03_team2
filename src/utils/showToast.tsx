import { toast } from 'sonner'
import Toast from '../components/common/toast/Toast'

export const showToast = (
  message: string,
  type: 'error' | 'warning' | 'success',
  title?: string
) => {
  toast.custom((t) => (
    <Toast id={t} title={title} message={message} type={type} />
  ))
}
