import { jsdom } from 'jsdom';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import sinonChai from 'sinon-chai';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import 'isomorphic-fetch';

// create a fake DOM (browser) in memory
global.document = jsdom('');
global.window = document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// add chai plugins
chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.use(sinonChai);

// compile CSS Modules via require()
hook({
  extensions: ['.scss'],
  preprocessCss: (data, file) => sass.renderSync({ data, file }).css
});
