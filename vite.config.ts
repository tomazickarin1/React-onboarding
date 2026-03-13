// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['> 2%', 'not dead'],
    }),
    react(),
  ],
})
