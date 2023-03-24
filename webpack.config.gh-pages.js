const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'index': './src/index.ts',
    'recommendation-engine': './src/recommendation-engine/index.ts',
    'rendering-svg': './src/rendering-svg/index.ts'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(html|js|jpg)$/,
        use: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.html', '.jpg', '.css'],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, '.gh-pages'),
    libraryTarget: 'umd',
  },
};
