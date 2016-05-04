'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.tests = exports.server = exports.client = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function client() {
  return _gulp2.default.src(['./src/client/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
client.displayName = 'modules:lint:client';

function server() {
  return _gulp2.default.src(['./src/server/**/*.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
server.displayName = 'modules:lint:server';

function tests() {
  return _gulp2.default.src(['./tests/**/*.js']).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failAfterError());
}
tests.displayName = 'modules:lint:tests';

let all = _gulp2.default.parallel(client, server, tests);

exports.client = client;
exports.server = server;
exports.tests = tests;
exports.all = all;