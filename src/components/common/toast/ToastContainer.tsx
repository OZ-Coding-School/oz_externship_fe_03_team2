import { Toaster } from 'sonner'

// 토스트 겉 껍데기 설정

export default function ToastContainer() {
  return (
    <Toaster
      position="bottom-center"
      duration={4000}
      toastOptions={{
        style: {
          left: 'calc(50% - 14rem)',
        },
      }}
    />
  )
}
