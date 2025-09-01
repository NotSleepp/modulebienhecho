import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'mfe1',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloWorld': './src/components/HelloWorld.vue'
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
    port: 5001
  },
  preview: {
    port: 5001
  }
})
