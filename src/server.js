'use strict';

import gulp from 'gulp';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import del from 'del';

function application() {
  let filterJS = filter(['**/*.js'], { restore: true });
  return gulp.src(['./src/**/*.{js,html,pem}'])
    .pipe(filterJS)
    .pipe(babel())
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./dist/server'));
}
application.displayName = 'build:application';
gulp.task(application);

function index() {
  return gulp.src(['./index.src.js'])
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'));
}
index.displayName = 'build:index';
gulp.task(index);

function clean() {
  return del([
    './dist/*'
  ]);
}
clean.displayName = 'build:clean';
gulp.task(clean);


let build = gulp.series(gulp.parallel(application, index));
build.displayName = 'build:all';
gulp.task(build);

export { application, clean, build };
