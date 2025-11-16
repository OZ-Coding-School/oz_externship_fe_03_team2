import { Toaster } from 'sonner'

function NotificationToastContainer() {
  return (
    <Toaster
      position="top-right"
      duration={50000}
      toastOptions={{
        className: 'mt-10',
      }}
    />
  )
}

export default NotificationToastContainer
