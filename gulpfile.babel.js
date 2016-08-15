'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

function build() {
  return gulp.src(['./src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
}
build.displayName = 'build';
gulp.task(build);

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
    './dist'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

//Gulp Default
//let defaultTask = gulp.series(modules.clean, modules.server.config, gulp.parallel(modules.client.build, modules.server.build));
let defaultTask = gulp.series(clean, build, index);
defaultTask.displayName = 'default';
gulp.task(defaultTask);
