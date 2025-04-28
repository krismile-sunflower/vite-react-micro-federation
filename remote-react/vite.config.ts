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
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: 'esnext',
  }
});
