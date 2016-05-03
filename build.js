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


function moduleCheck(done) {
  let modules = glob.sync('./modules/*');
  modules.forEach(function (module) {
    let modulePath = path.parse(module);
    if (fs.existsSync('./node_modules/' + modulePath.base)) {
      gutil.log(modulePath.base + ' exists in both ./node_modules and ./modules.  This will cause both modules to build.');
      done();
      process.exit(1);
    }
  });

  return done();
}
moduleCheck.displayName = 'module:check';
gulp.task(moduleCheck);

function buildFilter(file) {
  if (process.env.MEAN_BUILD_FORCE === 'true') {
    return false;
  }

  let filepath = path.parse(file.path);

  if (filepath.base === 'bower.json') {
    return fs.existsSync(filepath.dir + '/bower_components');
  } else if (filepath.base === 'package.json') {
    return fs.existsSync(filepath.dir + '/node_modules');
  }
}

function installModules(done) {
  return gulp.src(['./modules/*/bower.json', './modules/*/package.json'])
          .pipe(ignore.exclude(buildFilter))
          .pipe(install())
          .pipe(debug());
}
installModules.displayName = 'install';
gulp.task(installModules);

function buildModules() {
  return gulp.src(['./modules/*/gulpfile.babel.js'])
          .pipe(map(function (file, cb) {
            exec('gulp --gulpfile ' + file.path, function(error, stdout, stderr) {
              console.log(stdout);
              cb();
            });
          }));
}
buildModules.displayName = 'build';
gulp.task(buildModules);




function inject() {
  //TODO this is hacky cause I am in a hurry
  return gulp.src(['*/modern-mean-core-material/dist/server/views/index.server.view.html'])
    .pipe(ginject(gulp.src(['public/dist/angular.js', 'public/dist/bootloader.js', 'public/dist/**/*.{js,css}'], {read: false}), {
      ignorePath: '/public'
    }))
    .pipe(gulp.dest('.'));
}
inject.displayName = 'inject';
gulp.task(inject);

function clean() {
  return del([
    './public/dist'
  ]);
}
inject.displayName = 'clean';
gulp.task(clean);


export {
  clean,
  inject,
  installModules,
  buildModules,
  moduleCheck
};
