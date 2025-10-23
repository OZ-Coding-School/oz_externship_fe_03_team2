import { Toaster } from 'sonner'

// 토스트 겉 껍데기 설정

export default function ToastContainer() {
  return (
    <Toaster
      position="top-center"
      duration={4000}
      // 토스트 너비 지정 시 필요할 수 있는 내용임.
      toastOptions={{
        className: 'w-[18rem] mx-[auto]',
        style: {
          position: 'fixed',
          margin: '0',
        },
      }}
    />
  )
}
