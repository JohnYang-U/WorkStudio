import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: './',
  build: {
     sourcemap: true, // 确保启用 Source Map
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
    sourcemap: true, // 开发模式下启用 Source Map
  },
  clearScreen: false
})