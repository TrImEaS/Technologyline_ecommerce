import { defineConfig } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':'https://technologyline.com.ar',
    },
  },
})
