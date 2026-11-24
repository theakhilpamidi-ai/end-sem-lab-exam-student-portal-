import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Forward /api calls to Express so cookies work without CORS setup.
    proxy: { '/api': 'http://localhost:5000' },
  },
})
