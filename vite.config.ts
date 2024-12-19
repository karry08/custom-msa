import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  plugins: [react()],
})
