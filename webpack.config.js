const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true,
  },

  devtool: 'source-map',

  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css?modules&sourceMap!sass'),
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),

    // new webpack.optimize.UglifyJsPlugin(),
  ],
};
