'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.server = exports.client = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _child_process = require('child_process');

var _client = require('./client');

var clientBuild = _interopRequireWildcard(_client);

var _server = require('./server');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ok(done) {
  console.log("WTF!!!!!!!!!!!!!!", clientBuild);
  return done();
}

function client() {
  return _gulp2.default.watch(['./src/client/**/*', '!**/*.constants.js', '!**/*.values.js'], _gulp2.default.series(ok, clientBuild.build));
}
client.displayName = 'modules:watch:client';

function server() {
  return _gulp2.default.watch(['./src/server/**/*'], _gulp2.default.series(_server.build));
}
server.displayName = 'modules:watch:server';

function send(done) {
  if (process.send) {
    process.send({ ready: true });
    process.on('disconnect', () => {
      //process.exit(1);
      done();
    });
  }
}
send.displayName = 'modules:watch:ready';

let all = _gulp2.default.parallel(client, server, send);
all.displayName = 'modules:watch:all';

exports.client = client;
exports.server = server;
exports.all = all;