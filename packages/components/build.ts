Bun.build({
  entrypoints: ['lib/index.ts'],
  outdir: './out',
  target: 'browser',
  format: 'esm',
  splitting: false, // Change to true to enable splitting
  sourcemap: 'linked',
  minify: false, // Change to true to make the code fucking unreadable for almost no performance boost
  root: '.',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-syntax-highlighter', 'sleepydogs', 'classnames']
});
