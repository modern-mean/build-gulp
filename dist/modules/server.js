'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = exports.clean = exports.application = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function application() {
  let filterJS = (0, _gulpFilter2.default)(['**/*.js'], { restore: true });
  return _gulp2.default.src(['./src/server/**/*.{js,html,pem}']).pipe(filterJS).pipe((0, _gulpBabel2.default)()).pipe(filterJS.restore).pipe(_gulp2.default.dest('./dist/server'));
}
application.displayName = 'modules:server:application';
_gulp2.default.task(application);

function clean() {
  return (0, _del2.default)(['./dist/server']);
}
clean.displayName = 'modules:server:clean';
_gulp2.default.task(clean);

let build = _gulp2.default.series(_gulp2.default.parallel(application));
build.displayName = 'modules:server:build';
_gulp2.default.task(build);

exports.application = application;
exports.clean = clean;
exports.build = build;