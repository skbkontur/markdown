/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        plugins: [['@swc/plugin-styled-components', { displayName: mode !== 'production' }]],
      }),
    ],
    define: {
      global: 'window',
    },
  };
});
