import gulp from 'gulp';
import debug from 'gulp-debug';
import del from 'del';
import coveralls from 'gulp-coveralls';
import run from 'gulp-run';

function coverage() {
  return gulp.src('tests/.coverage/lcov.info')
  .pipe(coveralls());
}
coverage.displayName = 'test:coverage';
gulp.task(coverage);

function clean() {
  return del([
    './tests/.coverage/**'
  ]);
}
clean.displayName = 'test:clean';
gulp.task(clean);

function src() {
  return run('npm test').exec();
}

function watchFiles() {
  return gulp.watch(['./src/**/*', './tests/**(!.coverage)/*'], gulp.series(newsrc));
}

let watch = gulp.series(src, watchFiles);
watch.displayName = 'test:watch';
gulp.task(watch);


export { coverage, clean, src, watch };
