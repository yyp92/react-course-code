import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve, dirname } from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // @ 替代为 src
      '@': resolve(__dirname, 'src'),
      // @component 替代为 src/component
      // '@components': resolve(__dirname, 'src/components'),
      // '@utils': resolve(__dirname, 'src/utils'),
      // three: 'three/build/three.module.js'
    },
  },
})
