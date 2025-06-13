import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/reality-feedback-app/'  // This must match your GitHub repo name
})
