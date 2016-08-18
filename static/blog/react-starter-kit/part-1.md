Welcome to our first multipart post!  We'll be describing in detail how you would go about creating a starter kit for building a client side single page application (SPA) from scratch, using the generally agreed upon toolbox found in the React.js ecosystem.

##### I'm really new to programming.  I don't know:
- HTML (how a web page is structured)
 - Brief intro: [w3schools](http://www.w3schools.com/html/default.asp)
 - In depth: [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/Learn/HTML)
- CSS (how a web page is styled...font colors, etc.)
 - Brief intro: [w3schools](http://www.w3schools.com/css/default.asp)
 - In depth: [MDN](https://developer.mozilla.org/en-US/Learn/CSS)
- JavaScript (how a web page is dynamic...this is a loaded term)
 - Brief intro: [w3schools](http://www.w3schools.com/js/default.asp)
 - In depth: [MDN](https://developer.mozilla.org/en-US/Learn/JavaScript)
 - Free book: [Eloquent JavaScript](http://eloquentjavascript.net/)
 - Node.js: [Extensive list of resources](http://stackoverflow.com/a/5511507/2482993)

JS was originally created for the browser and for many years that's the only place it worked.  Then a really sharp cat named Ryan Dahl ported JS to the server and thus gave the world Node.  It operates similarly to JS in the browser, just in a different environment so it allows you to do things you cannot do in the browser and vice versa.  For example, you can read files from your filesystem or create a web server with Node, but you cannot perform browser specific functionality with it.

I'll do my best to point out when our JavaScript is running on the client (browser) or server (Node) as it can be easy to get confused when our project operates in both contexts.

##### What's a Single Page Application (SPA)?
Traditionally with web applications, anytime you navigate from one route to another (e.g. https://benjaminschnelle.com --> https://benjaminschnelle.com/blog) you would make a new request to the server which would send you back a new HTML page for that route and thus your browser would throw away the first page and load the new one.  This creates a full page refresh which causes a flicker on the screen.

In general SPAs make for a better user experience as the application feels more *native*.  Typically they take advantage of the [HTML5 browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API) [API (Application Programming Interface)](https://en.wikipedia.org/wiki/Application_programming_interface) which allows the user to navigate around using JavaScript (think the back and forward buttons in your browser).  In order to fetch data such as blog posts or user profile information we would make [HTTP (Hypertext Transfer Protocol)](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) requests to a remote server which would send data back in some agreed upon format, [JSON (JavaScript Object Notation)](http://www.json.org/) being the most common these days, which the JavaScript running in the browser would then use to update the UI.

We'll explore this subject more later on as we address specific concerns throughout our journey.

##### What's in our toolbox?
- [Markdown](https://github.com/adam-p/markdown-here/wiki): a neat way to write nicely formatted HTML using only text
- [Git](https://git-scm.com/): version control
- [GitHub](https://github.com/): our Git repository (where our source code lives) host
- [Node](https://nodejs.org/en/): server side Javascript runtime
- [NPM](https://www.npmjs.com/): Node's package manager
- [ESLint](http://eslint.org/): make sure we write consistent, well-formatted code
- [Webpack](https://webpack.github.io/): module bundler which takes many files and combines them into one or more files...WARNING: docs are no bueno, but this is an absolutely amazing tool
- Testing
 - [Mocha](https://mochajs.org/): testing framework/test runner
 - [Chai](http://chaijs.com/): test assertions (does this equal that?)
 - [Sinon](http://sinonjs.org/): spies, stubs, and mocks (helpers that making testing easier)
 - [Enzyme](http://airbnb.io/enzyme/): Airbnb powered React specific testing utilities
 - [JSDom](https://github.com/tmpvar/jsdom): a JavaScript implementation of the Document Object Model (DOM, the browser)...this creates a fake DOM which allows us to test browser code from the command line (terminal)
 - [Istanbul](https://github.com/gotwarlost/istanbul): code coverage...how much of our code has been tested?
- [React](https://facebook.github.io/react/): view layer of our app (just the user interface)
- [Redux](http://redux.js.org/): data layer (state management)

##### Steps we're going to take
1. Create our project
2. Add version control with Git and use Github as our repo host
3. Initialize Node Package Manager (NPM)
4. Setup ESLint
5. Configure Webpack for development
6. Configure Webpack for production
7. React and React Router
8. Testing setup
9. Redux
10. Immutable.js
11. Misc development tools

I'll be doing all development from Mac OSX so if you're on a different platform your mileage may vary.  Have questions? Just ask!

## 1. Create our project
First, a quick primer on the terminal.  You can use `command + space` to open Spotlight Search on OSX and search for "terminal". Press enter to open it up.  It should look like this.

![Terminal](../../images/terminal.jpg)

You can do a lot of stuff here, like start applications, run Node scripts, etc.  The scope is much too large to get into here, but if you want to learn more there are plenty of resources available like this [one](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line).

We will primarily be using it to create files and folders as well as run Node scripts.  To get started we need to create a directory for our application.  You can create it anywhere, I put all of my projects under a folder named "dev" under my home directory.  If you type `pwd` (print working directory) and hit enter it will tell you what the working directory is (where you "are").  When you first open your terminal you'll be in your "home" directory such as "/Users/bschnelle".  

##### A few helpful commands we'll use
- `mkdir dev`: create a new directory named "dev" (`mkdir` is the command, `dev` is an argument)
- `cd dev`: change the current working directory to "dev"
- `cd ..`: change the current working directory to the parent of your current working directory (go up one level)
- `cd`: go back to your "home" directory
- `printf`: print text to the terminal or into a file (with `>`)

Navigate to wherever you want to put your project (or create a new directory for your projects) and run the commands below.  You can name your project whatever you want, I'm calling mine "benjaminschnelle.com" because that's what where I'm going to deploy the application.

```bash
mkdir benjaminschnelle.com
cd benjaminschnelle.com
mkdir src
printf "node_modules\ndist" > .gitignore
printf "benjaminschnelle.com" > README.md
```

#### What are those commands doing?
1. Creates a new directory named "benjaminschnelle.com".  
2. Changes the working directory to the one we just created.
3. Makes a directory named "src" where our source code will live.
4. Prints two directory names, "node_modules" (where NPM installs packages) and "dist" (where Webpack will spit out its files) into a new file named ".gitignore".  The `\n` is a new line (the same as pressing enter at the end of a sentence).  We'll need this file in the next step when we add version control (Git).  It just tells Git to ignore those directories when tracking files.  
5. Creates a new file named "README.md" which is just a nice convention to follow that provides more information about your project.  GitHub will display the contents of this file by default on the homepage of your project.

Let's open up our project in a text editor now.  If you don't already have one [Atom](https://atom.io/) is a great option provided by GitHub for free.  Open source rocks.

As you follow along, if you take a look at the GitHub commits (to be discussed shortly) you'll see another folder at the root of our project named "static" that has this blog post as well as some images in it.  For now, you don't need to worry about creating this yourself, but later you'll need at least one markdown file in static/blog/react-starter-kit so we have something to display in the blog we're going to build.

## 2. Add version control with Git and use Github as our repo host
To get our version control with Git/GitHub setup you'll need 2 things: Git (install locally) and a GitHub account.  Head over [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for Git and [here](https://github.com/) to create a GitHub account.

[Git](https://git-scm.com/) is a version control system that allows us to "commit" (snapshot) our project at any point in time.  Then if we need to rollback changes or create a new branch to add a feature we can do that.  GitHub will be our repository host where we save our changes (commits).

Once you have Git installed and have created a GitHub account, create a new repository on GitHub as described [here](https://help.github.com/articles/create-a-repo/) with whatever name you please.  After you have your repository created grab its HTTPS URL (you can use SSH also, but you'll have to create a key) then from the project root run the commands below in your terminal plugging in your repository URL in place of mine.  If you followed the commands above and still have the same terminal open you should already be in the root of your project ("benjaminschnelle.com").

```bash
git init
git add .
git commit -m 'initial commit'
git remote add origin https://github.com/bschnelle/benjaminschnelle.com.git
git push -u origin master
```

#### What's going on above?
1. Initialize Git in the current directory.
2. Stage all files (excluding those in our ".gitignore" file) so that they can be committed.
3. Commit all of our staged files...described above.
4. Set our remote repository to the one we just created on GitHub.  This is where we're going to push our local repo to.  That way if we spill water on our laptop or want to share the repo with someone else it can just be cloned/downloaded from GitHub.
5. Push our local repository to the master branch on GitHub and set the upstream repository to our GitHub repo.  You'll be prompted for your GitHub credentials when this command is run.

If everything worked correctly you should be able to refresh the repo on GitHub and see your local project's files!

GitHub has some tools that make managing a project pretty nice.  You can create milestones as longer term goals and then add issues/features to your milestone as "todo" items.  Once all your issues have been completed your milestone can be considered complete and closed out.

// TODO add milestone and issues for v0.1.0

## 3. Initialize Node Package Manager (NPM)
Great! We have somewhere to put our application code now, but wouldn't it be great if we were able to piggy back off of all of the hard work people have been doing for years?  I agree!  So there are lots of ways we could use other people's code, but the easiest by far, that I know of, is to use NPM.  How do we get NPM?  We install Node.js which comes with NPM!  So cruise over to the [Node](https://nodejs.org/en/) site and follow the installation instructions.

All done?  Awesome.

Let's install stuff!  Wait, how do we do that?  Well first we need to initialize our project with NPM so that we can use it to manage our dependencies.  Run the command below.  It'll ask you a bunch of questions to which you can either accept the default (by pressing enter) or provide your own values.  If you screw something up, don't worry.  You can change all of the values afterwards.

```bash
npm init
```

This command will generate a `package.json` file in the root of our project containing our answers to the questions asked.  This file is magical.  It is how we'll manage all of our dependencies.  You can either edit it manually or the NPM command line interface (CLI) will edit it for you if you tell it to.  We'll see how to do that shortly.  Here's what I got after I answered some of the questions.

```json
{
  "name": "benjaminschnelle.com",
  "version": "0.0.1",
  "description": "a site about some guy",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bschnelle/benjaminschnelle.com.git"
  },
  "author": "Benjamin Schnelle <benjamin.schnelle@gmail.com> (https://github.com/bschnelle)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/bschnelle/benjaminschnelle.com/issues"
  },
  "homepage": "https://github.com/bschnelle/benjaminschnelle.com#readme"
}
```

Since we now have our project under version control, you're free to commit anytime you see fit.  There aren't really any downsides to committing frequently and doing so gives you more flexibility if you need to rollback for any reason.  Also, smaller changes are easier for others to follow when trying to get up to speed on your project.  Remember our issues we created that we need to complete in order to reach our first 0.1.0 milestone?  We get to close one!  You can automatically close issues using keywords (close, fix, resolve) in your commit messages.

```bash
git add .
git commit -m 'initialized NPM...closes #1'
git push origin master
```

## 4. Setup ESLint
If you're unfamiliar with hinting/linting it's just the idea of following certain conventions when writing code so that things are standardized.  It's especially helpful when working on a team of developers so that you don't run into a scenario where one person is using tabs to indent and another is using spaces.  Consistency good, inconsistency bad.

ESLint makes it easy for us to enforce those rules.  ESLint + Atom makes it easy to get *realtime* feedback right in the IDE.  There are many preconfigured sets of rules available for ESLint and Airbnb provides a pretty good one so we'll use that.  If you/me/we decide we want to change something later we can do that also!

#### Side note on NPM
NPM packages can be saved in multiple ways, but the two we're concerned with are as development dependencies (`devDependencies`) or production dependencies (`dependencies`) with the `--save-dev` and `--save` arguments, respectively.  

NPM was originally intended to be a server side development tool (for Node), but is now widely used for client side development and the use cases between the two are a little different.  In the case of server development one should be able to clone the repository from GitHub (or wherever) and run `NODE_ENV=production npm install` which will only install those packages defined in the `dependencies` section of "package.json" then run the application.  In the case of a client app it is a little different.  Here, we should be able to clone the repository, run the same installation command with NODE_ENV set to "production", bundle our application (as we'll describe later using Webpack), and finally deploy it.

It is easy (for me anyway) to view the bundling step as a development concern so intuitively it makes sense to put those packages in `devDependencies`, but if we did that we wouldn't be able to bundle our app successfully when having NODE_ENV set to "production".  Therefore, if you see things being installed with `--save-dev` when you think `--save` makes more sense, it is likely for this reason.

Let's go ahead and get ESLint from our handy friend NPM in addition to some other related dependencies.  Run the two commands below, which as suggested by the "eslint-config-airbnb" page, will get the package's peer dependencies then pipe them through some regex and install all of them in addition to the package itself.  Finally, we also need to install "babel-eslint" in order to properly lint certain ES6/ES7 features like class properties.  

```bash
export PKG=eslint-config-airbnb;
npm info "$PKG" peerDependencies --json \
  | command sed 's/[\{\},]//g ; s/: /@/g' \
  | xargs npm install --save-dev "$PKG"
npm install --save-dev babel-eslint
```

If you take a look at your `package.json` file now, there should be a new section called `devDependencies` similar to the one below.

```json
{
  "babel-eslint": "^6.1.2",
  "eslint": "^3.2.2",
  "eslint-config-airbnb": "^10.0.0",
  "eslint-plugin-import": "^1.13.0",
  "eslint-plugin-jsx-a11y": "^2.1.0",
  "eslint-plugin-react": "^6.0.0"
}
```

Now that we have our packages installed we need to tell ESLint to use the Airbnb rules when linting.  To do that we need to add a new file in the root of our project named ".eslintrc".  Make your file look like the one below which tells ESLint we want to use "babel-eslint" as our parser, we'll be writing code for the browser so ignore browser global variables, and use the "eslint-config-airbnb" rules.

```json
{
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "extends" : "airbnb"
}
```

At this point we could add a linting script to our `package.json` file, but we'll hold off on that until a little later.

#### But wait, how do we make it work with Atom?
Oh, remember how I said Atom is awesome?  It has its own package manager to install plugins for the editor to add all sorts of functionality.  ESLint is one of those packages.  Surprise.

If you installed Atom earlier you already have APM (Atom Package Manager) installed.  To get the ESLint plugin run the command below.

```bash
apm install linter-eslint
```

That was eerily similar to how we install NPM packages right?  That's because APM is built on top of NPM.

Ok, one more thing to get it working in Atom.  From the Atom menu click Preferences which should open up a new tab.  Click the Packages link on the lefthand side of the tab, then search for "linter-eslint" and enable the package.  It should look like the image below after it has been enabled.

![Atom linter-eslint](../../images/atom-linter-eslint.jpg)

Go ahead and create an `index.js` file in the "src" folder and paste in the code below.  If ESLint is setup correctly you should get an error telling you that line 5 is missing a newline then when you fix that it'll say it's missing a semicolon.  We'll need this file later (with different contents) so you can keep it around if you please.

```javascript
class Dog {
  woof = () => 'woof'
}

export default Dog
```

Finally, let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added and configured ESLint...closes #2'
git push origin master
```

#### Summary
We covered a lot here and we're making solid progress.  In the next part we'll get started with Webpack, a roided out bundling tool.
