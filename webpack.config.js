const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

const webpackConfig = {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: config.host,
    hot: !config.production,
    port: config.port
  },

  devtool: 'source-map',

  entry: {
    app: [
      './src/index.js'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract([
          `css?modules&sourceMap&importLoaders=1${config.production ? '&minimize' : ''}`,
          'postcss',
          'sass'
        ])
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    new webpack.DefinePlugin({ __DEV__: !config.production }),

    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],

  postcss: [autoprefixer]
};

if (config.production) {
  // add optimizations
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    // create global constants at compile time...
    // this enables minification to remove entire
    // code blocks that are environment specific
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
} else {
  // add HMR
  webpackConfig.entry.app.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${config.host}:${config.port}`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;
