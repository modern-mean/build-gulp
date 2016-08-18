'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _build = require('./build');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let serverWatcher;

function server(done) {
  serverWatcher = _gulp2.default.watch(['./src/**/*'], _gulp2.default.series(_build.all));
  return done();
}
server.displayName = 'build:watch';

exports.server = server;