const path = require('path');
const webpackConfigGhPages = require('./webpack.config.gh-pages.js');

module.exports = {
  ...webpackConfigGhPages,
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    static: './src/',
    compress: true,
    port: 9000
  },
  mode: 'development',
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, '.dev-server'),
    libraryTarget: 'umd',
  },
};
