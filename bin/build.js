const debug = require('debug');
const fs = require('fs-extra');
const path = require('path');

const log = debug('benjaminschnelle.com');
const STATIC = path.resolve(process.cwd(), 'static');
const DIST = path.resolve(process.cwd(), 'dist');

(function build() {
  try {
    log('emptying dist');
    fs.emptyDirSync(DIST);
  } catch (err) {
    log('shit went cray trying to empty dist', err);
    process.exit(1);
  }

  try {
    log('copying static --> dist');
    fs.copySync(STATIC, DIST);
  } catch (err) {
    log('shit went cray trying to copy static to dist', err);
    process.exit(1);
  }
}());
