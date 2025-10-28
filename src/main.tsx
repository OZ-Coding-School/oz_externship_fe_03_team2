import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MSW !== 'true') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // Service Worker 시작 (Promise 반환)
  return worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 10,
      retry: 1, //useQuery만 해당, useMutation은 기본적으로 retry 하지 않아서 mutation 시키려면 따로 옵션을 mutations: { retry: 0 } 이런 식으로 해야되는데 특정 행동 반복하는 건 위험하니까 안 하는 게 나을 수 있음
      refetchOnWindowFocus: false,
    },
  },
})
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  )
})
