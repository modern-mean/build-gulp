'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import * as build from './src/build';

function clean() {
  return del([
    './dist'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

//Gulp Default
//let defaultTask = gulp.series(modules.clean, modules.server.config, gulp.parallel(modules.client.build, modules.server.build));
let defaultTask = gulp.series(clean, build.all);
defaultTask.displayName = 'default';
gulp.task(defaultTask);
