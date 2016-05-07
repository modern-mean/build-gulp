'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.server = exports.client = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _child_process = require('child_process');

var _client = require('./client');

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function client() {
  return _gulp2.default.watch(['./src/client/**/*', '!**/*.constants.js', '!**/*.values.js'], _gulp2.default.series(_client.build));
}
client.displayName = 'modules:watch:client';

function server() {
  return _gulp2.default.watch(['./src/server/**/*'], _gulp2.default.series(_server.build));
}
server.displayName = 'modules:watch:server';

let all = _gulp2.default.parallel(client, server);
all.displayName = 'modules:watch:all';

exports.client = client;
exports.server = server;
exports.all = all;