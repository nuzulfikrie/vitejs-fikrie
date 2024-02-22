import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to handle CORS during development
      '/api': {
        target: 'https://amalgam.theeagle.center', // The backend server you want to proxy to
        changeOrigin: true, // This sets the `Host` header of the request to the target URL
        secure: true, // Set to false if the backend server uses an invalid or self-signed SSL certificate
        // pathRewrite: {'^/api' : ''} // If your server endpoint doesn't have '/api', you need to rewrite the path.
        // Example:


  
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Add your session cookie configuration here
        // Example:
        cookieDomainRewrite: 'amalgam.theeagle.center',
        cookiePathRewrite: '/',
        headers: {
          Cookie: 'lhpoodfsec30bdgbv605bt7b34', // Specify the session cookie here
        },
      },
    },
  },
});

/*
notes


// vite.config.js
export default {
  server: {
    proxy: {
      // Proxy all requests containing 'api' and use session cookie
      '/api': {
        target: 'https://your-custom-domain.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Add your session cookie configuration here
        // Example:
        cookieDomainRewrite: 'your-custom-domain.com',
        cookiePathRewrite: '/',
        headers: {
          Cookie: 'lhpoodfsec30bdgbv605bt7b34' // Specify the session cookie here
        }
      },
      // Add more proxy rules if needed
    }
  }
}

*/
