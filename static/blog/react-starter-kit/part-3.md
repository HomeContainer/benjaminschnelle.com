We configured Webpack for development in the last part.  In this part we're going to keep working with Webpack and make the changes necessary to create our production bundles.

## 6. Configure Webpack for production

As mentioned in the last part we want to apply any optimizations we can to our application prior to deploying it to give the user the best experience possible.  First, we need to know if we're in a "production" environment so we can tell Webpack how to behave.

Create a new directory and file in config/index.js.  We'll use this file to store global config options. `process` is a global Node.js object with information related to the currently executing Node process.  We're concerned with the `env` property which includes the user's environment variables.  

Below we're getting references to your `HOST` and `PORT` environment variables which we'll use to determine where to run your dev server.  If they're not provided we'll fallback to "localhost:8080" which is what we've been using thus far.  We're also checking `NODE_ENV` and setting a boolean `production` property we'll use in "webpack.config.js".

```javascript
module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '8080',
  production: process.env.NODE_ENV === 'production'
};
```

> #### Transmission Control Protocol (TCP) and Internet Protocol (IP)
Oversimplification: in [TCP/IP](https://en.wikipedia.org/wiki/Internet_protocol_suite) a *host* is a unique computer on a network and a *port* is a unique process (e.g., a web server) on that host.

Update "webpack.config.js" as shown below.  Notice that we've added several options to `devServer` including ones we were specifying in our `start` script.  This means we can update it to `"start": "webpack-dev-server"`.

```javascript
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

const webpackConfig = {
  devServer: {
    // option changes
    contentBase: './dist',
    host: config.host,
    port: config.port
  },

  // remove devtool

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
      // remove css/scss
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    // remove HotModuleReplacementPlugin

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      // new config
      minify: {
        collapseWhitespace: true
      }
    })
  ],

  postcss: [autoprefixer]
};

// new section to apply config based on our environment (dev or prod)
if (config.production) {
  // add css loader with ExtractTextPlugin
  webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract([
      'css?modules&importLoaders=1&minimize',
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
  // devServer options
  webpackConfig.devServer.debug = true;
  webpackConfig.devServer.hot = true;
  // source maps
  webpackConfig.devtool = 'source-map';
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

Start up your dev server and make sure HMR and source maps are still working correctly as well.

#### Commit our changes

```bash
git add .
git commit -m 'added Webpack production config...closes #4'
git push origin master
```

#### Summary
That wraps up our major Webpack config for now.  We'll continue to update it as necessary when we add additional features.  In the next section we get into React.
