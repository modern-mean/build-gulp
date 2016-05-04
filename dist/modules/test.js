'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.client = exports.clean = exports.coverage = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpConcat = require('gulp-concat');

var _gulpConcat2 = _interopRequireDefault(_gulpConcat);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _karma = require('karma');

var _gulpIstanbul = require('gulp-istanbul');

var _gulpIstanbul2 = _interopRequireDefault(_gulpIstanbul);

var _gulpMocha = require('gulp-mocha');

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

var _gulpCoveralls = require('gulp-coveralls');

var _gulpCoveralls2 = _interopRequireDefault(_gulpCoveralls);

var _gulpExit = require('gulp-exit');

var _gulpExit2 = _interopRequireDefault(_gulpExit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isparta = require('isparta');

function coverage() {
  return _gulp2.default.src('tests/.coverage/**/lcov.info').pipe((0, _gulpDebug2.default)()).pipe((0, _gulpConcat2.default)('lcov.info')).pipe((0, _gulpCoveralls2.default)());
}
coverage.displayName = 'modules:test:coverage';

function clean() {
  return (0, _del2.default)(['./tests/.coverage/**']);
}
clean.displayName = 'modules:test:clean';

function client(done) {
  new _karma.Server({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
client.displayName = 'modules:test:client';

function server(done) {
  _gulp2.default.src(['./src/server/**/*.js']).pipe((0, _gulpIstanbul2.default)({
    instrumenter: isparta.Instrumenter,
    includeUntested: true
  })).pipe(_gulpIstanbul2.default.hookRequire()) // or you could use .pipe(injectModules())
  .on('finish', function () {
    _gulp2.default.src(['./tests/server/**/*.js'])
    //.pipe(injectModules())
    .pipe((0, _gulpMocha2.default)({
      reporter: 'spec',
      require: ['./tests/mocha.setup']
    })).pipe(_gulpIstanbul2.default.writeReports({
      dir: './tests/.coverage/server',
      reporters: ['lcov', 'html', 'text']
    })).once('error', () => {
      process.exit(1);
      return done();
    }).on('end', () => {
      return done();
    })
    //TODO this is needed until gulp-mocha is fixed
    .pipe((0, _gulpExit2.default)());
  });
}
server.displayName = 'module:test:server';

exports.coverage = coverage;
exports.clean = clean;
exports.client = client;
exports.server = server;