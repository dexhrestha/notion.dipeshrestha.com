const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.mjs',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};