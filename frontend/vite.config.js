import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your backend
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5000', // if you also fetch images/videos
        changeOrigin: true,
        secure: false,
      },
      '/homepage': {
        target: 'http://localhost:5000', // if you use the homepage route
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    include: [
      '@tiptap/react',
      '@tiptap/starter-kit',
      '@tiptap/extension-bold',
      '@tiptap/extension-italic',
      '@tiptap/extension-underline',
      '@tiptap/extension-document',
      '@tiptap/extension-paragraph',
      '@tiptap/extension-text'
    ],
  },
})
