'use strict';

import gulp from 'gulp';
import * as builder from './src/build.es6';
import * as linter from './src/lint.es6';

//gulp build
let build =  gulp.series(builder.clean, builder.all);
build.displayName = 'build';
gulp.task(build);

//gulp test
let test = gulp.series(linter.all);
test.displayName = 'test';
gulp.task(test);

//gulp
let defaultTask = gulp.series(build);
defaultTask.displayName = 'default';
gulp.task(defaultTask);
