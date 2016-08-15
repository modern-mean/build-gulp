'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.server = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _child_process = require('child_process');

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let serverWatcher;

function server(done) {
  serverWatcher = _gulp2.default.watch(['./src/**/*'], _gulp2.default.series(_server.build));
  return done();
}
server.displayName = 'build:watch';

function send(done) {
  if (process.send) {
    process.send({ ready: true });
    process.on('disconnect', () => {
      serverWatcher.close();
      return done();
    });
  }
}
send.displayName = 'build:watch:ready';

let all = _gulp2.default.parallel(server, send);
all.displayName = 'build:watch:all';

exports.server = server;
exports.all = all;