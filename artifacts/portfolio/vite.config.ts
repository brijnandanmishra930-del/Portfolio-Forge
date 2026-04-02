mport { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // Isse agar 3000 busy bhi hoga toh error nahi aayega
  },
})
