import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// admin.html 是本地内容看板工具（已 gitignore，不进仓库）：
// 存在时才加入构建入口，保证克隆下来的仓库没有它也能正常 build
const adminEntry = fileURLToPath(new URL('./admin.html', import.meta.url))
const input = { main: fileURLToPath(new URL('./index.html', import.meta.url)) }
if (existsSync(adminEntry)) input.admin = adminEntry

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    rollupOptions: { input },
  },
})
