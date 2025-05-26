
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
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
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-button'],
          icons: ['lucide-react'],
          query: ['@tanstack/react-query']
        }
      }
    },
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    target: 'esnext',
    // Enable compression
    cssMinify: 'esbuild',
  },
  // Optimize performance with faster HMR
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  },
  // Enable gzip compression
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
}));
