'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import file from 'gulp-file';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mainBowerFiles from 'main-bower-files';
import ngConfig from 'gulp-ng-config';
import templateCache from 'gulp-angular-templatecache';
import debug from 'gulp-debug';
import del from 'del';

function bootloader() {
  return gulp.src(['./client/**/core.client.app.loader.js'])
          .pipe(rename('bootloader.js'))
          .pipe(gulp.dest('./dist/client'));
}
bootloader.displayName = 'bootloader';
gulp.task(bootloader);

function angular() {
  let bowerFiles = mainBowerFiles();
  let angularJS = filter(['**/angular.js'], { restore: false });
  return gulp.src(bowerFiles)
    .pipe(angularJS)
    .pipe(rename('angular.js'))
    .pipe(gulp.dest('./dist/client'));
}
angular.displayName = 'angular';
gulp.task(angular);

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
      module: process.env.MM_MODULE_ANGULAR + '.templates',
      moduleSystem: 'IIFE'
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

function constants() {
  return file(process.env.MM_MODULE_ANGULAR + '.client.config.constants.js', process.env.MM_MODULE_CLIENT_CONSTANTS, { src: true })
    .pipe(ngConfig(process.env.MM_MODULE_ANGULAR + '.config', {
      wrap: true,
      createModule: false
    }))
    .pipe(gulp.dest('./client/config'));
}
constants.displayName = 'modules:client:constants';
gulp.task(constants);

function values() {
  return file('core.client.config.values.js', process.env.MM_MODULE_CLIENT_VALUES, { src: true })
    .pipe(ngConfig('core.config', {
      type: 'value',
      wrap: true,
      createModule: false
    }))
    .pipe(gulp.dest('./client/config'));
}
values.displayName = 'modules:client:values';
gulp.task(values);

let build = gulp.series(clean, gulp.parallel(constants, values), gulp.parallel(application, images, vendor, templates));
build.displayName = 'modules:client:build';
gulp.task(build);

export { application, images, clean, vendor, build, constants, values, templates, bootloader, angular }
