import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
export default defineConfig({
  server: {
    open: true,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "simple-peer": "simple-peer/simplepeer.min.js",
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
