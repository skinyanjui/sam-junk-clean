
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
    // Ensure directories aren't treated as modules
    preserveSymlinks: false
  },
  build: {
    // Show detailed build errors
    reportCompressedSize: true,
    // Optimize chunk size
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui/button', '@/components/ui/form']  // Specify individual UI components instead of entire directory
        }
      }
    },
    // Generate source maps for production builds
    sourcemap: mode === 'development',
    // Minify output in production
    minify: mode === 'production' ? 'esbuild' : false,
  },
  // Optimize performance with faster HMR
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
}));
