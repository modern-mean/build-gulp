'use strict';

import gulp from 'gulp';
import * as build from './dist/build';
import * as test from './dist/test';
import * as lint from './dist/lint';
import * as watch from './dist/watch';

let clean = gulp.parallel(build.clean, test.clean);
clean.displayName = 'modules:clean';
gulp.task(clean);

export { build, test, lint, clean, watch };
