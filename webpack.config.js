const path = require('path');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './build/ClientApp.js',
  output: {
    publicPath: '/static/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.[hash].js',
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: '../build/manifest.json',
    }),
  ],
  mode: 'development',
};
