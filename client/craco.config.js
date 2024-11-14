const path = require('path');

// React Refresh Plugin für HMR in der Entwicklung
const CracoReactRefreshPlugin = require('craco-plugin-react-refresh');

module.exports = {
  webpack: {
    output: {
      path: path.resolve(__dirname, 'dist'), // Pfad besser mit `path.resolve`
      filename: 'bundle.js',
      publicPath: '/',
    },
    alias: {
      '@components': path.resolve(process.cwd(), './src/components'),
      '@services': path.resolve(process.cwd(), './src/services'),
    },
  },
  plugins: [
    ...(process.env.NODE_ENV === 'development'
        ? [{ plugin: CracoReactRefreshPlugin }]
        : []),
  ],
};
