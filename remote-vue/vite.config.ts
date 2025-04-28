import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    federation({
      name: 'remote_vue',
      filename: 'remoteEntry.js',
      exposes: {
        // './VueApp': './src/App.vue',
          './VueAppElement': './src/webcopmonets.ts', // 注意路径和名字
      },
      shared: ['vue']
    })
  ],
  build: {
    target: 'esnext',
  }
})
