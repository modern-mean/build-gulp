import gulp from 'gulp';
import debug from 'gulp-debug';
import del from 'del';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import coveralls from 'gulp-coveralls';

var isparta = require('isparta');

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

function src(done) {

  gulp.src(['./src/**/*.es6'])
  .pipe(istanbul({
    instrumenter: isparta.Instrumenter,
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  .on('finish', function () {
    //TODO Find better way to include .es6 files for testing.
    require.extensions['.es6'] = require.extensions['.js'];
    gulp.src(['./tests/**/*.spec.es6'])
    //.pipe(injectModules())
    .pipe(mocha({
      reporter: 'spec',
      require: ['./tests/mocha.setup.es6'],
    }))
    .pipe(istanbul.writeReports(
      {
        dir: './tests/.coverage',
        reporters: [ 'lcov', 'html', 'text' ]
      }
    ))
    .on('error', () => {
      return done();
    })
    .on('end', () => {
      return done();
    });
    //TODO this is needed until gulp-mocha is fixed
    //.pipe(exit());
  });
}
src.displayName = 'test:src';
gulp.task(src);

function watchFiles() {
  return gulp.watch(['./src/**/*', './tests/**(!.coverage)/*'], gulp.series(src));
}

let watch = gulp.series(src, watchFiles);
watch.displayName = 'test:watch';
gulp.task(watch);


export { coverage, clean, src, watch };
