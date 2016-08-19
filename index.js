'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.lint = exports.test = exports.build = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _build = require('./dist/build');

var build = _interopRequireWildcard(_build);

var _test = require('./dist/test');

var test = _interopRequireWildcard(_test);

var _lint = require('./dist/lint');

var lint = _interopRequireWildcard(_lint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let clean = _gulp2.default.parallel(build.clean, test.clean);
clean.displayName = 'modules:clean';
_gulp2.default.task(clean);

exports.build = build;
exports.test = test;
exports.lint = lint;
exports.clean = clean;