'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import debug from 'gulp-debug';
import del from 'del';
import { Server as KarmaServer } from 'karma';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import coveralls from 'gulp-coveralls';
import exit from 'gulp-exit';

var isparta = require('isparta');

function coverage() {
  return gulp.src('tests/.coverage/**/lcov.info')
    .pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}
coverage.displayName = 'modules:test:coverage';

function clean() {
  return del([
    './tests/.coverage/**'
  ]);
}
clean.displayName = 'modules:test:clean';



function client(done) {
  new KarmaServer({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
client.displayName = 'modules:test:client';

function server(done) {
  gulp.src(['./src/server/**/*.js'])
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
      .on('end', () => {
        return done();
      })
      //TODO this is needed until gulp-mocha is fixed
      .pipe(exit());
  	});
}
server.displayName = 'module:test:server';


export { coverage, clean, client, server };
