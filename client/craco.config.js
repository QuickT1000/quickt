const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(process.cwd(), './src/components'),
      '@services': path.resolve(process.cwd(), './src/services'),
    },
  },
};

