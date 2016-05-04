'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

function lint() {
  return gulp.src(['./server/**/*.js', './client/**/*.js', './tests/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint';


function client() {
  return gulp.src(['./client/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint:client';


function server() {
  return gulp.src(['./server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint:server';

function tests() {
  return gulp.src(['./tests/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint:tests';

let all = gulp.parallel(client, server, tests);

export { client, server, tests, all }
