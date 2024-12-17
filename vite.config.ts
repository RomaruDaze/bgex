import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './src/main.tsx',
        newtab: './src/newtab.tsx'
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  },
  publicDir: 'public',
});