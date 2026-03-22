import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/actorgram/',
  server: {
    host: '0.0.0.0',
    port: 40000,
  },
})
