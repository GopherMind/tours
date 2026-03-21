import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router", "react-router-dom"],
          antd: ["antd", "@ant-design/icons"],
          swiper: ["swiper"],
          map: ["maplibre-gl"],
          motion: ["motion"],
        },
      },
    },
  },
});
