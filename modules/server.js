"use strict";

import gulp from 'gulp';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import jeditor from 'gulp-json-editor';
import del from 'del';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
var isparta = require('isparta');

function application() {
  let filterJS = filter(['**/*.js'], { restore: true });
  return gulp.src(['./server/**/*.{js,html,pem}'])
    .pipe(filterJS)
    .pipe(babel())
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./dist/server'));
}
application.displayName = 'modules:server:application';
gulp.task(application);

function test(done) {
  gulp.src(['./server/**/*.js'])
  	.pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  	.on('finish', function () {
  	  gulp.src(['./tests/server/**/*.js'])
      //.pipe(injectModules())
  		.pipe(mocha({
        reporter: 'spec',
        require: ['./tests/mocha.setup'],
      }))
  		.pipe(istanbul.writeReports(
        {
          dir: './tests/.coverage/server',
          reporters: [ 'lcov', 'html', 'text' ]
        }
      ))
      .once('error', () => {
        process.exit(1);
        return done();
      })
      .once('end', () => {
        return done();
      });
  	});
}
test.displayName = 'module:server:test';
gulp.task(test);

function clean() {
  return del([
    './dist/server'
  ]);
}
clean.displayName = 'modules:server:clean';
gulp.task(clean);


let build = gulp.series(gulp.parallel(application));
build.displayName = 'modules:server:build';
gulp.task(build);

export { application, test, clean, build };
