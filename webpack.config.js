import path from 'path'
import webpack from 'webpack'

module.exports = {

  /** serve index.html in response to 404s */
  devServer: {
    historyApiFallback: true,
    hot: true
  },

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080/', // <--- auto refresh
      'webpack/hot/only-dev-server', // <--- HMR change to dev-server to refresh on HMR reload failure
      './src/index.js'
    ]
  },

  module: {
    loaders: [

      /** ESx --> ES5 */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },

      /** SASS css-modules */
      {
        test: /(\.scss|\.css)$/,
        loaders: ['style', 'css?modules', 'sass']
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // build directory
    filename: '[name].js' // name of output file
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    /**
     * split css into separate file (instead of inlined style tags)
     * output a file named styles.css which includes ALL styles
     * regardless of whether or not the JS is loaded async
     * using this (with allChunks: true) results in all styles being
     * combined into single CSS file (regardless of async loading)
     */
    // new ExtractTextPlugin('styles.css', { allChunks: true }),

    /** dynamically create html file and inject script tags */
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
