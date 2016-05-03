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

function cleanServer() {
  return del([
    './dist/server'
  ]);
}
cleanServer.displayName = 'modules:server:clean';
gulp.task(cleanServer);

function config() {
  return gulp.src('./server/config/client.json')
    .pipe(jeditor(function(json) {
      let stringy = JSON.stringify(clientConfig.constants); // must return JSON object.
      return JSON.parse(stringy);
    }))
    .pipe(ngConfig('core.config', {
      wrap: true,
      createModule: false
    }))
    .pipe(rename('core.client.config.constants.js'))
    .pipe(gulp.dest('./client/config'))
    .pipe(gulp.src('./server/config/client.json'))
    .pipe(jeditor(function(json) {
      let stringy = JSON.stringify(clientConfig.values); // must return JSON object.
      return JSON.parse(stringy);
    }))
    .pipe(ngConfig('core.config', {
      type: 'value',
      wrap: true,
      createModule: false
    }))
    .pipe(rename('core.client.config.values.js'))
    .pipe(gulp.dest('./client/config'));

}
config.displayName = 'modules:client:config';
gulp.task(config);


export { application, test, config };
