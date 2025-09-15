// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Временная диагностика: подробные sourcemaps и без минификации
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    sourcemap: true,
    minify: false,          // <-- выключим минификацию, чтобы увидеть реальную строку
    target: 'es2018'        // нормальная цель для современных браузеров
  }
})
