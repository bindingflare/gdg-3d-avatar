import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        create: 'create/create.html',
      },
    },
  },
})
 
// https://vite.dev/guide/build.html#multi-page-app
