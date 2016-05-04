'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exports.clean = exports.lint = exports.test = exports.server = exports.client = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _client = require('./client');

var client = _interopRequireWildcard(_client);

var _server = require('./server');

var server = _interopRequireWildcard(_server);

var _test = require('./test');

var test = _interopRequireWildcard(_test);

var _lint = require('./lint');

var lint = _interopRequireWildcard(_lint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let clean = _gulp2.default.parallel(client.clean, server.clean, test.clean);
clean.displayName = 'modules:clean';
_gulp2.default.task(clean);

exports.client = client;
exports.server = server;
exports.test = test;
exports.lint = lint;
exports.clean = clean;
exports.exit = exit;