const path = require('path');

module.exports = {
  webpack: {
    output: {
      path: __dirname + '/dist', // Ändere den Pfad hier
      filename: 'bundle.js',
      publicPath: '/',
    },
    alias: {
      '@components': path.resolve(process.cwd(), './src/components'),
      '@services': path.resolve(process.cwd(), './src/services'),
    },
  },
};

