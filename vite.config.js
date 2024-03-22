import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.APP_KEY': JSON.stringify(env.APP_KEY),
      'process.env.APP_ID': JSON.stringify(env.APP_ID),
    },
    plugins: [react()],
  }
})