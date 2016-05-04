'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

function client() {
  return gulp.src(['./src/client/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
client.displayName = 'modules:lint:client';


function server() {
  return gulp.src(['./src/server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
server.displayName = 'modules:lint:server';

function tests() {
  return gulp.src(['./tests/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
tests.displayName = 'modules:lint:tests';

let all = gulp.parallel(client, server, tests);

export { client, server, tests, all }
