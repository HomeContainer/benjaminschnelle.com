We configured Webpack for development in the last part.  In this part we're going to keep working with Webpack and make the changes necessary to create our production bundles.

## 6. Configure Webpack for production
As mentioned in the last part we want to apply any optimizations we can to our application prior to deploying it to give the user the best experience possible.  

Update your "webpack.config.js" file again as shown below.

```javascript
// ...dependencies

// new variable that will be exported further down
const webpackConfig = {
  // ...more config

  entry: {
    app: [
      // remove lines here
      './src/index.js'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],

  postcss: [autoprefixer]
};

// new section to apply config based on our environment (dev or prod)
if (config.production) {
  // add css loader
  webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract([
      'css?modules&sourceMap&importLoaders=1&minimize',
      'postcss',
      'sass'
    ])
  });
  // add optimizations
  webpackConfig.plugins.push(
    new ExtractTextPlugin('styles-[contenthash].css'),
    new webpack.optimize.DedupePlugin(), // remove duplicate code
    new webpack.optimize.OccurrenceOrderPlugin(), // webpack optimization
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        warnings: false // disable command line warnings
      }
    }),
    // create global constants at compile time...
    // this enables the minification step to remove
    // entire environment specific code blocks (React.js)
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
} else {
  // add css loader
  webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loaders: [
      'style',
      'css?modules&sourceMap&importLoaders=1',
      'postcss',
      'sass'
    ]
  });
  // add HMR
  webpackConfig.entry.app.unshift(
    `webpack-dev-server/client?http://${config.host}:${config.port}`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

// export our config variable
module.exports = webpackConfig;

```

If you'll remember from our last post we already created a `build` script in our "package.json".

Run the `build` script now and inspect the contents of the "dist" folder, you'll see everything has been nicely minified/uglified for optimal distribution to our users!  Great!

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Webpack production config...closes #4'
git push origin master
```

#### Summary
That wraps up our major Webpack config for now.  We'll continue to update it as necessary as we add additional features.  In the next section we get into React.
