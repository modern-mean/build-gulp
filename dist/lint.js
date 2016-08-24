'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.tests = exports.src = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function src() {
  return _gulp2.default.src(['./src/**/*.es6']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
src.displayName = 'lint:src';
_gulp2.default.task(src);

function tests() {
  return _gulp2.default.src(['./tests/**/*.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
tests.displayName = 'lint:tests';
_gulp2.default.task(tests);

let all = _gulp2.default.parallel(src, tests);

exports.src = src;
exports.tests = tests;
exports.all = all;