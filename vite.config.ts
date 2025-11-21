import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Use the GitHub Pages base only for production builds. Keep dev server at '/'.
  base: command === 'build' ? '/SmartSplit/' : '/',
  plugins: [react()],
}))
