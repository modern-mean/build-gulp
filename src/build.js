'use strict';

import gulp from 'gulp';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import del from 'del';

function src() {
  let filterJS = filter(['**/*.js'], { restore: true });
  return gulp.src(['./src/**/*', './src/**/.*'])
    .pipe(filterJS)
    .pipe(babel())
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./dist'));
}
src.displayName = 'build:src';
gulp.task(src);

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


let all = gulp.series(gulp.parallel(src, index));
all.displayName = 'build:all';
gulp.task(all);

export { src, clean, all, index };
