const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

module.exports = {
  devServer: {
    contentBase: './dist',
    host,
    hot: true,
    port,
  },

  devtool: 'source-map',

  entry: {
    app: [
      `webpack-dev-server/client?http://${host}:${port}/`,
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css?modules&sourceMap&importLoaders=1!postcss!sass'),
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new ExtractTextPlugin('styles-[contenthash].css'),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),

    // new webpack.optimize.UglifyJsPlugin(),
  ],

  postcss: [autoprefixer],
};
