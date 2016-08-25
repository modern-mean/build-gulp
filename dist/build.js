'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.index = exports.all = exports.clean = exports.src = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function src() {
  let filterJS = (0, _gulpFilter2.default)(['**/*.es6', '!**/templates/**/*'], { restore: true });
  return _gulp2.default.src(['./src/**/*']).pipe(filterJS).pipe((0, _gulpBabel2.default)()).on('error', function (e) {
    _gulpUtil2.default.log(_gulpUtil2.default.colors.red('[Compilation Error]'));
    _gulpUtil2.default.log(_gulpUtil2.default.colors.red(e));
    this.emit('end');
  }).pipe((0, _gulpRename2.default)(function (path) {
    path.extname = '.js';
    return path;
  })).pipe(filterJS.restore).pipe(_gulp2.default.dest('./dist'));
}
src.displayName = 'build:src';
_gulp2.default.task(src);

function index() {
  return _gulp2.default.src(['./index.es6']).pipe((0, _gulpBabel2.default)()).pipe((0, _gulpRename2.default)('index.js')).pipe(_gulp2.default.dest('./'));
}
index.displayName = 'build:index';
_gulp2.default.task(index);

function clean() {
  return (0, _del2.default)(['./dist']);
}
clean.displayName = 'build:clean';
_gulp2.default.task(clean);

let all = _gulp2.default.series(_gulp2.default.parallel(src, index));
all.displayName = 'build:all';
_gulp2.default.task(all);

function watchFiles() {
  return _gulp2.default.watch(['./src/**/*'], _gulp2.default.series(src));
}

let watch = _gulp2.default.series(clean, src, watchFiles);
watch.displayName = 'src:watch';
_gulp2.default.task(watch);

exports.src = src;
exports.clean = clean;
exports.all = all;
exports.index = index;
exports.watch = watch;