// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['> 2%', 'not dead'],
    }),
  ],
}
