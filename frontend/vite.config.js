import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5500,
    strictPort: true,
    host: '0.0.0.0' // Allow access from network
  },
  plugins: [react()],
});

