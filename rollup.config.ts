import html from '@rollup/plugin-html';

export default {
  input: 'src/main.js', // Specify your JavaScript entry point
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [
    html({
      fileName: 'index.html',
    }),
  ],
};
