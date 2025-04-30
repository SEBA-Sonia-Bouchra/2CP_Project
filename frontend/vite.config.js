import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
      // add any other extensions you're using
    ],
  },
})
