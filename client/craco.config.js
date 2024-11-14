const path = require('path');

module.exports = {
  webpack: {
    output: {
      path: path.resolve(__dirname, 'dist'), // Pfad besser mit `path.resolve`
      filename: 'bundle.js',
      publicPath: '/'
    },
    alias: {
      '@components': path.resolve(process.cwd(), './src/components'),
      '@services': path.resolve(process.cwd(), './src/services')
    },
  }
};
