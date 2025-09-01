import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host_app',
      remotes: {
        mfe1: 'http://localhost:5001/assets/remoteEntry.js',
        mfe2: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.0.0'
        }
      }
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true
  },
  server: {
    port: 5000
  }
})
