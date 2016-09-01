'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.src = exports.clean = exports.coverage = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpIstanbul = require('gulp-istanbul');

var _gulpIstanbul2 = _interopRequireDefault(_gulpIstanbul);

var _gulpMocha = require('gulp-mocha');

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

var _gulpCoveralls = require('gulp-coveralls');

var _gulpCoveralls2 = _interopRequireDefault(_gulpCoveralls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isparta = require('isparta');

let watchFlag = false;

function coverage() {
  return _gulp2.default.src('tests/.coverage/lcov.info').pipe((0, _gulpCoveralls2.default)());
}
coverage.displayName = 'test:coverage';
_gulp2.default.task(coverage);

function clean() {
  return (0, _del2.default)(['./tests/.coverage/**']);
}
clean.displayName = 'test:clean';
_gulp2.default.task(clean);

function src(done) {

  _gulp2.default.src(['./src/**/*.es6']).pipe((0, _gulpIstanbul2.default)({
    instrumenter: isparta.Instrumenter,
    includeUntested: true
  })).pipe(_gulpIstanbul2.default.hookRequire()) // or you could use .pipe(injectModules())
  .on('finish', function () {
    //TODO Find better way to include .es6 files for testing.
    require.extensions['.es6'] = require.extensions['.js'];
    _gulp2.default.src(['./tests/**/*.spec.es6'])
    //.pipe(injectModules())
    .pipe((0, _gulpMocha2.default)({
      reporter: 'spec',
      require: ['./tests/mocha.setup.es6']
    })).on('error', () => {
      if (!watchFlag) {
        process.exit(1);
      }
      return done();
    }).pipe(_gulpIstanbul2.default.writeReports({
      dir: './tests/.coverage',
      reporters: ['lcov', 'html', 'text']
    })).on('end', () => {
      process.exit();
      return done();
    });

    //TODO this is needed until gulp-mocha is fixed
    //.pipe(exit());
  });
}
src.displayName = 'test:src';
_gulp2.default.task(src);

function watchFiles() {
  watchFlag = true;
  return _gulp2.default.watch(['./src/**/*', './tests/**(!.coverage)/*'], _gulp2.default.series(src));
}

let watch = _gulp2.default.series(src, watchFiles);
watch.displayName = 'test:watch';
_gulp2.default.task(watch);

exports.coverage = coverage;
exports.clean = clean;
exports.src = src;
exports.watch = watch;