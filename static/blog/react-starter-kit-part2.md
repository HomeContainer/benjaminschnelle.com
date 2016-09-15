In the last part we created our project, added it to source control with Git and GitHub, initialized NPM for dependency management, and added ESLint so we can write well-formatted code.

## 5. Configure Webpack for development
Webpack is a roided out bundling tool written with SPAs in mind.  Webpack by itself doesn't actually do much, the real power comes from *loaders* and *plugins*.

![Stewie Steroids](http://i.imgur.com/cpticcz.gif)

> #### What's a bundling tool?  
Writing all of our application code in separate *modules* makes development much more efficient and enjoyable, but when we actually deploy our code we want to optimize it as much as possible.  Reducing the number of files via bundling is a part of the optimization process.  Webpack enables us to do that among other things.

##### What will we be using Webpack for during development?
- Web Server: Webpack has an installable development server, `webpack-dev-server`, powered by Node and [Express](https://expressjs.com/) (a web framework for Node)
  - Hot module replacement: edit our application and see the changes in realtime *without* losing the current application state! (it isn't just an automatic page refresh) 😲
- Loaders: put files in, transform them, get bundle(s) out
  - `babel-loader`: JSX/ES6/ES7 (JSX is React specific syntax) --> ES5 (old, but well supported JavaScript)
  - `postcss-loader`: add browser/vendor prefixes where appropriate (PostCSS does more, but this is what we'll be using it for)
  - `sass-loader`: SASS (supercharged CSS) --> regular CSS
  - `react-hot-loader`: enables us to use HMR with React
- Plugins: add bundle related functionality
  - `ExtractTextPlugin`: create CSS bundle
  - `HotModuleReplacementPlugin`: necessary for dev server HMR
  - `HtmlWebpackPlugin`: dynamically create our HTML

> #### Babel
> [Babel](https://babeljs.io/) is a powerful tool for transforming JavaScript.  We'll see it in action shortly.

#### Getting Started
Create an "index.html" file in your "src" directory with the code below.  This is telling the browser we'll be using English (`lang="en"`) and to use the [UTF-8](http://www.w3schools.com/charsets/ref_html_utf8.asp) character set (`charset="utf-8"`).  The `<div id="root"></div>` tag is where we'll inject our React app later.

```html
<!doctype html>
<html lang="en">
  <head>
    <title>React Starter Kit!</title>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Remember that "index.js" file we created in our "src" directory in the last part?  Open that puppy back up and delete its contents then paste in the code below.  We've used the ES6 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) here to demonstrate how Webpack transpiles ES6 to ES5.

```javascript
const setHTML = () => {
  document.getElementById('root').innerHTML = 'Hey dude!';
};

setHTML();

```

##### What's going on here?
- `setHTML`: we're creating a `const` (a variable that cannot be changed) that holds an arrow function that calls the `getElementById` function on the global `document` object.  Remember in our ".eslintrc" file where we told it to ignore browser related variables?  This is one of those.  The `document` object is how you interact with the web page, such as getting a reference to a DOM node like we're doing here.
- `setHTML()`: call our function to actually change the `innerHTML` of the element with id of "root" to "Hey dude!".

Ok, so now we have an HTML file that doesn't reference any JavaScript files and a JavaScript file that sets the inner html of our "root" `div` element.  How do we wire the two up?  Well we could just add a `script` tag to our "index.html" file to pull our JS in, but that doesn't give us much flexibility.  

Using the `HtmlWebpackPlugin` we can have Webpack dynamically inject `script` and `link` tags for us and also have a hash appended to the name for cache busting (prevent the browser from using a cached file).

#### Installation
Let's install the packages we're going to need.  You'll see webpack installed twice, once locally, then again globally (with the `-g` option).  We need it installed locally because we'll need to use the package directly a little later and we need it and `webpack-dev-server` installed globally so that we can use them from the command line.

```bash
npm install --save webpack@2.1.0-beta.21 html-webpack-plugin \
babel-core babel-loader babel-preset-es2015 babel-preset-react \
babel-preset-stage-0
npm install -g webpack@2.1.0-beta.21 webpack-dev-server@2.1.0-beta.0
```

> We're installing specific versions of `webpack@2.1.0-beta.21` and `webpack-dev-server@2.1.0-beta.0` because we want to be able to take advantage of new features that are currently still in beta.  We'll touch on this more a little later.

##### Babel packages
- `babel-core`: the main Babel engine
- `babel-loader`: use Babel with Webpack (discussed earlier)
- `babel-preset-es2015`: ES6 --> ES5
- `babel-preset-react`: JSX --> ES5
- `babel-preset-stage-0`: experimental ES7 --> ES5

#### Configuration
Now we can go ahead and begin our Webpack setup.  Create a new file in the root of your project named "webpack.config.js" with the code below.  You'll notice that we're using `require` to import NPM packages here.  This file is going to be run by Node which currently doesn't support ES6 modules.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
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
  ]
};

```

##### What's going on here?
- [HtmlWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin): lets us dynamically create/augment our HTML file
- [path](https://nodejs.org/api/path.html#path_path_resolve_path): is a Node.js library for resolving file paths
- `module.exports`: [CommonJS](https://webpack.github.io/docs/commonjs.html) style modules.  Webpack is a Node utility and Node uses CommonJS as their module system.
  - `entry`: tell Webpack where to enter our application when bundling (use `app` as the bundle's name)
  - `module`: options affecting our modules (JS/JSX/SASS/etc.)
   - `loaders`
      - `test`: which files do we want this loader to apply to ([RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) based)
      - `exclude`: ignore files that match this RegEx
      - `loader`: the actual loader to use to transform the matched files
  - `output`: where do we want Webpack to spit out the files it creates?
   - `path`: directory to put the file(s) in (must be an absolute path)
   - `filename`: use the name from `entry` (app) and append a hash to it
  - `plugins`
   - `HtmlWebpackPlugin`
     - `template`: starting point for our HTML file
     - `inject`: which section of the "index.html" file should the plugin inject `script` tags into

So we're looking for files with a ".js" extension, that are *not* in the "node_modules" folder and then transforming them with the `babel` loader (we could also write it as `loader: 'babel-loader'`).  

In order for Babel to do any transforms we need to tell it what transforms we want applied.  This is specified with Babel plugins or presets (groups of plugins).  You can configure Babel a few different ways: add a `"babel": {}`  section to your "package.json" file, specify it in your "webpack.config.js", or using a ".babelrc" file.  We'll use the last option, so create a file named ".babelrc" in the project root with the contents below.

```json
{
  "presets": ["es2015", "react", "stage-0"]
}
```

#### Launch the app
Go ahead and run the following command from the root of your project then open your browser and visit <host>:<port> (e.g. localhost:8080) to see your app.  If it worked correctly you should see "Hey dude!".

```bash
webpack-dev-server --content-base dist/
```

What just happened?  We started our `webpack-dev-server` which bundled up our application code into a file named something like "app-42d809adf5fa9e5d6ac5.js", put that in the "dist" folder, copied our src/index.html file into the "dist" folder, and then inserted a script tag into the `body` tag to load our bundle.  `--content-base dist/` tells our server to serve the contents of the "dist" directory.  Awesome!

#### Build the app
Hold on a minute.  I don't see a folder named "dist" in my project though.  That's because it is all done in memory!  Want to see the files with your own eyes?  Hop back over to the command line and kill the server with `control + C`.  Now run the command below and then jump back to your text editor after it finishes....voila, there it is!

```bash
webpack
```

#### What's going on in our bundle?
Let's get even crazier.  Go ahead and open up the "app-42d809adf5fa9e5d6ac5.js" file in the "dist" directory.  It's pretty ugly and has a bunch of ESLint errors, let's fix those first.  Create a new file in the root of your project called ".eslintignore" and paste in the text below.  This tells ESLint to ignore everything in the "dist" directory.  If it doesn't fix your errors try reopening the file.

```
dist
```

The first 70 lines or so are all Webpack related stuff for module caching so that we don't load modules more than once.  If you scroll to the bottom you'll see our application code that just adds "Hey dude!" to a div.  If you look close you'll see that our arrow function is gone and has been replaced by a regular function.  That's the ES6 --> ES5 transpilation that Babel does for us.  Wow.

![Wow](https://media.giphy.com/media/3Lc7UTKUBh00U/giphy.gif)

#### Minification
Pretty cool, but what about all those comments and whitespace?  We don't want to send all that crap to our users because they don't need it and it's only going to make their downloads take longer.  Let's get rid of it.  Update your "webpack.config.js" file to look like the one below.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack'); // new

module.exports = {
  entry: {
    app: './src/index.js'
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
    }),

    new webpack.optimize.UglifyJsPlugin() // new
  ],
};

```

Delete the contents of the "dist" directory then run `webpack` again to rebuild the app.  We'll automate this command a little later.

Open up "app-42d809adf5fa9e5d6ac5.js" again (it'll have a new hash now).  It's just a single line now and it's really hard to read, BUT it's really minimal which is great for performance!

We have two problems now: during development our beautiful ES6 source code now has to be debugged in minified ES5 which is tough to say the least.  If you were to view the source code from your browser's [developer tools](https://developer.chrome.com/devtools) (open with `option + command + i` on OSX) you would see the same thing.  We can do better.

#### Source maps
Add `devtool: 'source-map',` just above the `entry` property of your "webpack.config.js" file.  This tells Webpack to create a source map which bridges the gap between your source code and the transpiled/uglified code.  Most modern browsers support source maps for debugging...I'm using Chrome, but most browsers should perform similarly.  

Fire up your dev server again with `webpack-dev-server -d --content-base dist/`, (note the new `-d` option) open up your browser dev tools, then refresh the page.  If you go to the "Sources" tab of the dev tools window you should see something similar to the images below.

Minified
![Chrome Dev Tools Minified](../../images/dev-tools-minified.jpg)

Original via source maps
![Chrome Dev Tools Source Maps](../../images/dev-tools-source-map.jpg)

If you want to build the source maps to disk you'll need to run `webpack -d`.

#### Convenience scripts
Manually deleting the contents of the "dist" folder is a pain in the ass.  Let's fix that.  Install `rimraf`, a library that makes it easy to delete the contents of our "dist" folder.

```bash
npm install --save rimraf
```

Next, update the `scripts` section of your "package.json" file as shown below.  The `build` script deletes the contents of "dist", sets NODE_ENV to "production", then builds our app.  Later on we'll use the value of NODE_ENV to conditionally apply Webpack config.  We've also added a `start` script to make starting our dev server a little easier.

```json
{
  "build": "rimraf dist && NODE_ENV=production webpack",
  "lint": "eslint src test",
  "start": "webpack-dev-server -d --content-base dist/",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

You can now run these commands with `npm run <command>`.  `start` is a default NPM script so you can run it with `npm start` or `npm run start`.

#### Tree-shaking
Webpack 2 has a new feature known as *tree-shaking* which removes unused code during the minification step.  To demonstrate how this works create a new file named "setHTML.js" with the contents below and update "index.js" as shown.

```javascript
// src/setHTML.js

const setHTML = () => {
  document.getElementById('root').innerHTML = 'Hey dude!';
};

export default setHTML;
export const woof = 'woof';

```

```javascript
// src/index.js

import setHTML from './setHTML';

setHTML();
```

We've moved our `setHTML` function to a new file where it is being exported (default).  We've also added a named export of `woof`.  In "index.js" we're importing `setHTML`, but *NOT* importing `woof` so it isn't actually being used anywhere.

Run `npm run build` to create our bundle, then open it up and search for "woof".  There are two occurrences of it, despite the fact that it doesn't actually do anything.  

The `UglifyJsPlugin` attempts to do dead code elimination (tree-shaking) by default, but our configuration is preventing that from happening.  By default, Babel transpiles ES6 modules to CommonJS modules which [prevents](http://www.2ality.com/2015/12/webpack-tree-shaking.html) tree-shaking from working so we just need to tell Babel not to use CommonJS modules.  Update your ".babelrc" file as shown below.

```json
{
  "presets": [["es2015", { "modules": false }], "react", "stage-0"]
}
```

Go ahead and build your app again then search for "woof" in the bundle.  It's gone! 😃

For now, I'm going to comment out the `UglifyJsPlugin` line since it's just going to add overhead during development.  Later when we setup our production build we'll add it back.

#### Stylezzz (SASS/CSS)

Wouldn't it be really awesome if we could make our div display "Hey dude!" in blue instead of black?  Hell yeah!  Wouldn't it be even more awesome if we could use something better than regular CSS to write it?

![Oh Yeah!](http://i.imgur.com/ZCjDCtN.gif)

We're going to use [SASS](http://sass-lang.com/) to write our styles, compile those to CSS, add vendor prefixes, locally scope our classes, bundle our styles into an external style sheet, then import those styles via our "index.html" file.  SASS makes writing CSS much more enjoyable and has some nice built in features like variables and functions.

CSS is global by default which makes class naming a pain in the ass, but some really smart guys came up with the idea of [CSS Modules](https://github.com/css-modules/css-modules) which locally scopes all CSS (via the Webpack css-loader) allowing you to reuse class names in different modules without conflict!

Let's install the necessary packages

```bash
npm install --save node-sass sass-loader postcss-loader autoprefixer \
css-loader extract-text-webpack-plugin@2.0.0-beta.3 style-loader
```

##### Packages
- `node-sass`: SASS --> CSS
- `sass-loader`: use node-sass with Webpack
- `postcss-loader`: tool to perform various transforms on CSS, we're using it to apply vendor prefixes with autoprefixer
- `autoprefixer`: vendor prefixes
- `css-loader`: bundle CSS and scope classes locally
- `extract-text-webpack-plugin`: create a CSS file from bundled CSS
- `style-loader`: inject CSS into `<style>` tag in our HTML

We've got the packages we need, but now we need to tell Webpack to use them.  Update your "webpack.config.js" file to mirror the one below.  We've added new entries to `loaders` and `plugins`.  

The new `loaders` entry will match both ".css" and ".scss" files and apply our loaders from right to left ending with `ExtractTextPlugin.extract`.  We're passing three options to our `css-loader`: `modules` enables CSS Modules (local scoping), `sourceMap` creates a source map for our compiled SASS, and finally `importLoaders=1` is a requirement to use `css-loader` with `postcss-loader`.

In the `plugins` section we're telling ExtractTextPlugin to name our bundled CSS file something like  "styles-ecb5dd1230609d11ec6b295438519a2d.css".

```javascript
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: './src/index.js'
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
          'css?modules&sourceMap&importLoaders=1&minimize',
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
    new ExtractTextPlugin('styles-[contenthash].css'), // new

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })

    // new webpack.optimize.UglifyJsPlugin(),
  ],

  postcss: [autoprefixer] // new
};

```

Now create a new file named "classes.scss" in the "src" directory and put the code below into it.

```css
.title {
  color: blue;
}
```

Finally, make the changes below to your "setHTML.js" file to add our ".title" class.

```javascript
import classes from './classes.scss';

const setHTML = () => {
  const root = document.getElementById('root');
  root.innerHTML = 'Hey dude!';
  root.className = classes.title;
};

export default setHTML;

```

> #### Webpack v2
> In your `start` script change `-d` to `--debug`, they're supposed to be synonyms, but CSS source maps don't appear to build unless the change is made.  This is likely a v2 beta quirk.

Go ahead and fire up your dev server again and enjoy your beautiful blue font.  If you inspect the `div` we added the ".title" class to you'll see it has been converted to a unique identifier and source maps have been created to map those new classes back to the original classes.

#### Hot Module Replacement (HMR)
Currently if you make changes to your source code while your development server is running you have to manually refresh your browser to see the changes.  That's entirely too much work, let's make it update automagically.

HMR is a feature of Webpack that lets us inject updated modules into our running application without a page refresh (via [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)).  This allows us to make changes to our running application *without* losing the application's state!  If that doesn't make any sense to you, don't worry, let's look at an example.

First we'll add auto-refreshing, then we'll add HMR to demonstrate the differences.  Remember how we installed `webpack-dev-server` globally earlier?  Now we need to install it locally as well, so let's go ahead and do that and save it in `devDependencies`.  In order to use auto-refreshing and HMR Webpack needs to add a little code to our bundle.

```bash
npm install --save-dev webpack-dev-server@2.1.0-beta.0
```

Update the `entry` property of your "webpack.config.js" file as shown below.  This adds a bit of code to our bundle that enables auto-refreshing.

```javascript
{
  // more config...
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      './src/index.js'
    ]
  },
  // more config...
}
```

Go ahead and restart your dev server, refresh your browser, then change "Hey dude!" to "Hey man!" in "setHTML.js" and save your file.  Your browser should refresh itself now.  Neat!

What if we had a text input on the page though?  Let's see what happens in that case.  Add the new line below.

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Benjamin Schnelle</title>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="root"></div>
    <input type="text" /> <!-- this is new -->
  </body>
</html>

```

Go back to the browser, type something in the text input, then jump back to your "setHTML.js" file and add a few exclamation marks to "Hey man!" and save your file.  If you're watching the browser you should see it refresh, but the value that was in the input is lost.  Bummer.

HMR to the rescue!  We need to add a few config options to our "webpack.config.js" file.  Make the changes below.

```javascript
const autoprefixer = require('autoprefixer');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack'); // uncomment

module.exports = {
  // new section
  devServer: {
    hot: true,
  },

  devtool: 'source-map',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server', // new line
      './src/index.js'
    ],
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
        // updated
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&minimize',
          'postcss',
          'sass'
        ]
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    // removed

    new webpack.HotModuleReplacementPlugin(), // new line

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })

    // new webpack.optimize.UglifyJsPlugin(),
  ],

  postcss: [autoprefixer]
};

```

##### What's going on here?  We made 4 changes.
- `webpack`: uncomment webpack import
- `devServer`: this property is for config options related to our development server...we add the `hot` flag so the server knows we want to use HMR
- `entry`: we added `'webpack/hot/only-dev-server'` to add more client code to facilitate HMR which will *not* fallback to auto-refreshing if an HMR update fails...if you would prefer your app to auto-refresh when HMR updates fail add `'webpack/hot/dev-server'` instead
- `module`: we updated the `loaders` key for our CSS file because `ExtractTextPlugin` doesn't work with HMR, but `style-loader` does so we'll add the former back when we configure our production build.
- `plugins`: `new webpack.HotModuleReplacementPlugin()` required for HMR to work and removed `ExtractTextPlugin` as noted above.

Right, so now we have our Webpack config updated to use HMR, but we need to explicitly enable HMR at the module level of our app.  Let's update the contents of "index.js" as shown below.

```javascript
// index.js

import setHTML from './setHTML';

if (module.hot) {
  module.hot.accept('./setHTML', () => setHTML());
}

setHTML();

```

As you can see, we've added an `if` block that only fires if some `module` object has a [truthy](http://james.padolsey.com/javascript/truthy-falsey/) `hot` property on it.  It than calls an `accept` function with the path to our `setHTML` file and a function that calls it.

Let's take it step by step.  Via Babel, Webpack transpiles our ES6 modules into ones currently supported by browsers which is where the global object `module` comes from.  `module.hot` is only defined if HMR is enabled.  The `accept` function is how we tell HMR which modules we want updated when they change, so here we're saying update our app when you detect a change in the "setHTML.js" file (or any of its children).  When you do detect a change call `setHTML` again.

Damn Ben, that was a lot of stuff.  What are we even getting out of this?

Restart your dev server and reload your application from the browser.  Type some stuff in the input, then update your "setHTML.js" file to add/remove a few exclamation marks to "Hey man!" then watch the browser as you save the file.  Your changes come through *AND* your application retains its state!

![Oh Shit!](https://media.giphy.com/media/dRGWII2nDN1D2/giphy.gif)

Ok, maybe you don't think it's that great, but when you're working with application state that takes a while to reach (filling out a form/walking through a wizard) it makes developing/debugging a lot more enjoyable.

#### Commit our changes

```bash
git add .
git commit -m 'added Webpack development config...closes #3'
git push origin master
```

[My repo after this commit](https://github.com/bschnelle/react-starter-kit/tree/351a065fb5a0dec0d95c1f29b9b80c0f5c0e73a3)

#### Summary
We covered a lot here and we'll continue to update our Webpack config in the next section where we'll update it for production.
