import { Toaster } from 'sonner'

function NotificationToastContainer() {
  return (
    <Toaster
      position="top-right"
      duration={4000}
      toastOptions={{
        className: 'mt-16',
        unstyled: true,
      }}
    />
  )
}

export default NotificationToastContainer
