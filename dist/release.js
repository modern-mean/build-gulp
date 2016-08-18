'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let currentVersion;

function npmBump() {}
npmBump.displayName = 'release:npm:bump';
_gulp2.default.task(npmBump);

function current() {
  (0, _child_process.exec)('npm version', data => {
    console.log(data);
  });
}
current.displayName = 'release:current';
_gulp2.default.task(current);