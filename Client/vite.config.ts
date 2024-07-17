import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    
  ],
  resolve: {
    alias: {
      "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons"),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
