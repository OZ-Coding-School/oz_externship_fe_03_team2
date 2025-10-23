import { Toaster } from 'sonner'

// 토스트 겉 껍데기 설정

export default function ToastContainer() {
  return (
    <Toaster
      position="top-center"
      duration={4000}
      toastOptions={{
        className: 'max-w-[18rem] w-full',
      }}
    />
  )
}
