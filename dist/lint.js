'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.tests = exports.server = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function server() {
  return _gulp2.default.src(['./src/server/**/*.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
server.displayName = 'modules:lint:server';

function tests() {
  return _gulp2.default.src(['./tests/**/*.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
tests.displayName = 'modules:lint:tests';

let all = _gulp2.default.parallel(server, tests);

exports.server = server;
exports.tests = tests;
exports.all = all;