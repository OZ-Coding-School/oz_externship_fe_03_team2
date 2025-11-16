import { Toaster } from 'sonner'

function NotificationToastContainer() {
  return (
    <Toaster
      position="top-right"
      duration={5000}
      toastOptions={{
        className: 'mt-10',
      }}
    />
  )
}

export default NotificationToastContainer
