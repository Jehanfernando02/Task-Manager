import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct package name

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});