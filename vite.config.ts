import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin(), VitePWA({ registerType: 'autoUpdate' })],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/anycluster': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      
    },
  },
})
