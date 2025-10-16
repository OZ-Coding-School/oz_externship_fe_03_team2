// ToastContainer.tsx
import { Toaster } from 'sonner'

export default function ToastContainer() {
  return (
    <Toaster
      position="bottom-center"
      duration={6000}
      toastOptions={{
        style: {
          left: 'calc(50% - 14rem)',
        },
      }}
    />
  )
}
