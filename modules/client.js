"use strict";

import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import ngAnnotate from 'gulp-ng-annotate';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import ginject from 'gulp-inject';
import stripDebug from 'gulp-strip-debug';
import del from 'del';
import babel from 'gulp-babel';
import map from 'map-stream';
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import ignore from 'gulp-ignore';
import install from 'gulp-install';
import { exec } from 'child_process';
import gutil from 'gulp-util';

function application() {
  let filterJS = filter(['**/*.js'], { restore: true }),
    filterCSS = filter(['**/*.css'], { restore: true });

  return gulp.src(['./client/**/*.module.js', './client/**/*.{js,css}', '!**/core.client.app.loader.js'])
    .pipe(filterJS)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./dist/client'))
    .pipe(filterJS.restore)
    .pipe(filterCSS)
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./dist/client'));
}
application.displayName = 'modules:client:application';
gulp.task(application);

function images() {
  return gulp.src(['./client/**/*.{jpg,png,gif,ico}'])
  .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ],
        use: [pngquant()]
      }))
    .pipe(gulp.dest('./dist/client'));
}
images.displayName = 'modules:client:images';
gulp.task(images);

function vendor() {
  let bowerFiles = mainBowerFiles();
  let filterCSS = filter(['**/*.css'], { restore: true });
  let filterJS = filter(['**/*.js', '!**/angular.js'], { restore: true });
  return gulp.src(bowerFiles)
    .pipe(filterCSS)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist/client'))
    .pipe(filterCSS.restore)
    .pipe(filterJS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/client'));
}
vendor.displayName = 'modules:client:vendor';
gulp.task(vendor);

function templates() {
  return gulp.src(['./client/**/*.html'])
    .pipe(templateCache({
      root: process.env.MM_MODULE_ROOT,
      module: process.env.MM_MODULE_ANGULAR
    }))
    .pipe(gulp.dest('./dist/client'));
}
templates.displayName = 'templates';
gulp.task(templates);

function clean() {
  return del([
    './dist/client'
  ]);
}
clean.displayName = 'modules:client:clean';
gulp.task(clean);

function test(done) {
  process.env.NODE_ENV = 'test';
  new KarmaServer({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
test.displayName = 'modules:client:test';
gulp.task(test);

let build = gulp.series(clean, gulp.parallel(application, images, vendor));
build.displayName = 'modules:client:build';
gulp.task(build);

export { application, images, clean, vendor, test, build }
