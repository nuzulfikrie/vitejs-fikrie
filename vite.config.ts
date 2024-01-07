import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to handle CORS during development
      '/api': {
        target: 'https://oldcopy.theeagle.center', // The backend server you want to proxy to
        changeOrigin: true, // This sets the `Host` header of the request to the target URL
        secure: false, // Set to false if the backend server uses an invalid or self-signed SSL certificate
        // pathRewrite: {'^/api' : ''} // If your server endpoint doesn't have '/api', you need to rewrite the path.
      },
    },
  },
});
