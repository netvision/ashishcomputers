import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3002,
    // Temporary proxy to bypass CORS issues during development
    proxy: {
      '/api': {
        target: 'https://computers.netserve.in',
        changeOrigin: true,
        secure: true,
      },
    },
  },
}) 