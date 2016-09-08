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

var _gulpCoveralls = require('gulp-coveralls');

var _gulpCoveralls2 = _interopRequireDefault(_gulpCoveralls);

var _gulpRun = require('gulp-run');

var _gulpRun2 = _interopRequireDefault(_gulpRun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function src() {
  return (0, _gulpRun2.default)('npm test').exec();
}

function watchFiles() {
  return _gulp2.default.watch(['./src/**/*', './tests/**(!.coverage)/*'], _gulp2.default.series(src));
}

let watch = _gulp2.default.series(src, watchFiles);
watch.displayName = 'test:watch';
_gulp2.default.task(watch);

exports.coverage = coverage;
exports.clean = clean;
exports.src = src;
exports.watch = watch;