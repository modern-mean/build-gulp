import gulp from 'gulp';
import * as client from './client';
import * as server from './server';

function coverage() {
  return gulp.src('tests/.coverage/**/lcov.info')
    .pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}
coverage.displayName = 'modules:coverage';
gulp.task(coverage);

function cleanCoverage() {
  return del([
    './tests/.coverage'
  ]);
}
cleanCoverage.displayName = 'modules:coverage:clean';
gulp.task(cleanCoverage);

function lint() {
  return gulp.src(['./server/**/*.js', './client/**/*.js', './test/**/*.js', '!**/client/**/*.constants.js', '!**/client/**/*.values.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'modules:lint';
gulp.task(lint);

let clean = gulp.parallel(client.clean, server.clean, cleanCoverage);
clean.displayName = 'modules:clean';
gulp.task(clean);

export { coverage, clean, client, server, lint };
