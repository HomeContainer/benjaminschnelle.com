import { jsdom } from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinonChai from 'sinon-chai';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';

// create a fake DOM (browser) in memory
global.document = jsdom('');
global.window = document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// add chai plugins
chai.use(chaiImmutable);
chai.use(sinonChai);

// compile CSS Modules via require()
hook({
  extensions: ['.scss'],
  preprocessCss: data => sass.renderSync({ data }).css
});
