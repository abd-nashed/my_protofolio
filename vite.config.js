import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // ✅ Rolldown (Vite 8) يقبل manualChunks كـ Function فقط
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'three-vendor';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-redux') ||
              id.includes('@reduxjs/toolkit') ||
              id.includes('react-i18next') ||
              id.includes('i18next')
            ) {
              return 'react-vendor';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});