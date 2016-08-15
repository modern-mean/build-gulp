'use strict';

import gulp from 'gulp';
import debug from 'gulp-debug';
import del from 'del';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import coveralls from 'gulp-coveralls';
import exit from 'gulp-exit';

var isparta = require('isparta');

function coverage() {
  return gulp.src('tests/.coverage/lcov.info')
    .pipe(coveralls());
}
coverage.displayName = 'modules:test:coverage';

function clean() {
  return del([
    './tests/.coverage/**'
  ]);
}
clean.displayName = 'modules:test:clean';

function server(done) {
  gulp.src(['./src/**/*.js'])
  	.pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  	.on('finish', function () {
  	  gulp.src(['./tests/**/*.js'])
      //.pipe(injectModules())
  		.pipe(mocha({
        reporter: 'spec',
        require: ['./tests/mocha.setup'],
      }))
  		.pipe(istanbul.writeReports(
        {
          dir: './tests/.coverage',
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


export { coverage, clean, server };
