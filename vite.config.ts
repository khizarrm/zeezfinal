import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 30,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 30,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 30,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
