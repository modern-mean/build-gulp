import gulp from 'gulp';
import eslint from 'gulp-eslint';

function src() {
  return gulp.src(['./src/**/*.es6'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
src.displayName = 'lint:src';
gulp.task(src);

function tests() {
  return gulp.src(['./tests/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
tests.displayName = 'lint:tests';
gulp.task(tests);

let all = gulp.parallel(src, tests);

export { src, tests, all };
