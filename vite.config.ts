import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // 빌드 후 자동으로 시각화 리포트를 브라우저에서 열기
      filename: 'dist/report.html', // 리포트 파일 위치
      gzipSize: true, // gzip 압축 크기 정보 포함 여부
      brotliSize: true, // brotli 압축 크기 정보 포함 여부
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 자주 변경되지 않는 대형 라이브러리만 분리
          vendor: ['react', 'react-dom', 'react-router'],
          // TanStack Query + Zustand는 비교적 작으니 묶기
          state: ['@tanstack/react-query', 'zustand'],
        },
      },
    },
  },
})
