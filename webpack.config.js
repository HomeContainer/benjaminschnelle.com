const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';
const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host,
    hot: !isProduction,
    port,
  },

  devtool: 'source-map',

  entry: {
    app: [
      './src/index.jsx',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: isProduction ? 'babel' : 'react-hot!babel',
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract([
          `css?modules&sourceMap&importLoaders=1${isProduction ? '&minimize' : ''}`,
          'postcss',
          'sass',
        ]),
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new webpack.DefinePlugin({ __DEV__: !isProduction }),

    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  postcss: [autoprefixer],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

if (isProduction) {
  // add optimizations
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
      },
    }),
    // create global constants at compile time...
    // this enables minification to remove entire
    // code blocks that are environment specific
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );
} else {
  // add HMR
  webpackConfig.entry.app.unshift(
    `webpack-dev-server/client?http://${host}:${port}/`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;
