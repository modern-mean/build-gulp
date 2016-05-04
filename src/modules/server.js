'use strict';

import gulp from 'gulp';
import filter from 'gulp-filter';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import del from 'del';



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

export { application, clean, build };
