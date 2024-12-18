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
        },
        {
          src: 'src/index.css',
          dest: '.',
        },
        {
          src: 'index.html',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: './src/Main.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  },
  publicDir: 'public',
});