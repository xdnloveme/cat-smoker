const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(process.cwd(), './src/index.js'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'react app',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
};
