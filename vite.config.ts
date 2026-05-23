import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use './' so asset paths work whether served from root or a subdirectory (e.g. username.github.io/repo/)
  base: './',
})
