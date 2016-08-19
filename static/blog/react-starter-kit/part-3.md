## 6. Configure Webpack for production
Now that we have Webpack mostly configured for development let's go ahead and get started with our production build setup.  Later on we'll worry about deployment.

If you're new to development you generally add certain features or fixes during development, then when you're ready to release them to users (production) you apply optimizations to make the user's experience as good as possible.  This includes minifying/uglifying our code (as we saw in the last part) among others.

Update your "webpack.config.js" file again as shown below.

```javascript
// ...dependencies, host, and port

// environment flag used below
const isProduction = process.env.NODE_ENV === 'production';

// new variable that will be exported further down
const webpackConfig = {
  devServer: {
    contentBase: './dist',
    host,
    hot: !isProduction, // set to true if NOT in production
    port,
  },

  devtool: 'source-map',

  entry: {
    app: [
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
        // here we've just broken our loaders into individual
        // lines rather than concatenating them with "!"...
        // we've also conditionally added the "minimize" param
        // to css-loader using an ES6 template string during our
        // production build to reduce the size of our CSS file
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
    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  postcss: [autoprefixer],
};

// new section to apply config based on our environment (dev or prod)
if (isProduction) {
  // add optimizations
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(), // remove duplicate code
    new webpack.optimize.OccurrenceOrderPlugin(), // webpack optimization
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        warnings: false, // disable command line warnings
      },
    }),
    // create global constants at compile time...
    // this enables the minification step to remove
    // entire environment specific code blocks
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

// export our config variable
module.exports = webpackConfig;

```

For our build script we're going to install the `rimraf` library which will make it easy for use to delete the contents of our "dist" folder before we rebuild our application each time.

```bash
npm install --save rimraf
```

Now let's add two new lines to the top of the `scripts` section of our "package.json".  We can now create our production bundle with `npm run build`, notice you must include the keyword `run`.  Why?  Well the reason you *didn't* have to use it with `npm start` is because `start` is a default NPM script.  Any custom scripts need the `run` keyword.  If it's easier for you to just always use the keyword you can do that as well (i.e. `npm run start`).

```json
{
  "build": "npm run lint && rimraf dist && NODE_ENV=production webpack",
  "lint": "eslint --ext .js --ext .jsx src test",
}
```

So what is our build script doing?  First it runs our new `lint` script which runs ESLint against our ".js" and ".jsx" files in our "src" and "test" directories.  Next, it runs `rimraf dist` which cleans out the "dist" folder (you can run multiple commands sequentially by joining them with `&&`).  Finally it runs `NODE_ENV=production webpack` which sets our `NODE_ENV` variable to "production" which is how we tell our app we're in production mode.  `NODE_ENV` is a ubiquitous environment variable in the Node ecosystem that is used for all sorts of things.

If you run the `build` script now and inspect the contents of the "dist" folder you'll see everything has been nicely minified/uglified for optimal distribution to our users!  Great!

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Webpack production config...closes #4'
git push origin master
```

#### Summary
That wraps up our major Webpack config for now.  We'll continue to update it as necessary as we add additional features.  In the next section we start getting into React.
