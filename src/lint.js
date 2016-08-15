'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

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

let all = gulp.parallel(server, tests);

export { server, tests, all }
