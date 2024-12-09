import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve, dirname } from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],

  resolve: {
    alias: {
      // 在这里添加路径别名
      '@': resolve(__dirname, 'src'),
      // 其他路径别名...
    },
  },
})
