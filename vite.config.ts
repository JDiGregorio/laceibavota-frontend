import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: 'APP_',
  server: {
    port: 5174
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: ['laceibavota-frontend-qziur.ondigitalocean.app', 'laceibavota.valentinvasquez.com'],
  },
})
