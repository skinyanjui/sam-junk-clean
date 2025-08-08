
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    allowedHosts: ["1a591aa1-ef7d-4eb6-823d-48a2c21d78fb.lovableproject.com"]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    preserveSymlinks: false
  },
  build: {
    reportCompressedSize: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('@radix-ui') || id.includes('shadcn')) {
              return 'ui-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            return 'vendor';
          }
          
          // App chunks
          if (id.includes('src/pages')) {
            return 'pages';
          }
          if (id.includes('src/components/home')) {
            return 'home';
          }
          if (id.includes('src/components/quote')) {
            return 'quote';
          }
          if (id.includes('src/components/services')) {
            return 'services';
          }
          if (id.includes('src/components/ui')) {
            return 'ui-components';
          }
        }
      }
    },
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    target: 'esnext',
    cssMinify: 'esbuild',
  },
  // Optimize performance with faster HMR
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  },
  // Enable gzip compression
  preview: {
    host: '0.0.0.0',
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
}));
