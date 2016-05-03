import gulp from 'gulp';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import debug from 'gulp-debug';
import del from 'del';
import { Server as KarmaServer } from 'karma';
import istanbul from 'gulp-istanbul';
var isparta = require('isparta');

function coverage() {
  return gulp.src('tests/.coverage/**/lcov.info')
    .pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}
coverage.displayName = 'modules:test:coverage';
gulp.task(coverage);

function clean() {
  return del([
    './tests/.coverage/**'
  ]);
}
clean.displayName = 'modules:test:clean';
gulp.task(clean);

function lint() {
  return gulp.src(['./server/**/*.js', './client/**/*.js', './tests/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint';
gulp.task(lint);

function client(done) {
  process.env.NODE_ENV = 'test';
  new KarmaServer({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
client.displayName = 'modules:test:client';
gulp.task(client);


export { coverage, clean };
