import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_react",
      filename: "remoteEntry.js",
      exposes: {
        "./ReactApp": "./src/App.tsx",
        "./HelloWorld": "./src/components/HelloWorld.tsx",
      },
      shared: ["react", "react-dom", "antd"],
    }),
  ],
  build: {
    target: 'esnext',
  },
  css: {
    modules: {
      // 生成的类名格式
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // 是否将 camelCase 转换为 kebab-case
      localsConvention: 'camelCase'
    }
  }
});
