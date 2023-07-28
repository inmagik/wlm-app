import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'WLM App',
    short_name: 'WLM App',
    description:
      'WLM App - Concorso Wiki Loves Monuments Italia 1 - 30 settembre 2023',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
    ],
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  // plugins: [react(), svgrPlugin(), VitePWA(manifestForPlugin)],
  plugins: [react(), svgrPlugin(), VitePWA({
    selfDestroying: true,
  })],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
