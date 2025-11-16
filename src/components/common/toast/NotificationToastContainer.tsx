import { Toaster } from 'sonner'

function NotificationToastContainer() {
  return (
    <Toaster
      position="top-right"
      duration={500000}
      toastOptions={{
        className: 'mt-10',
      }}
    />
  )
}

export default NotificationToastContainer
