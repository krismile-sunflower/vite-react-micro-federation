import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        remote_vue: "http://localhost:3001/dist/assets/remoteEntry.js",
        remote_react: "http://localhost:3002/dist/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "vue"],
    }),
  ],
  build: {
    target: 'esnext',
    // minify: true,
  },
});
