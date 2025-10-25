import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.lassus-xavier.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // enlève /api du début de l’URL
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
