'use strict';

import gulp from 'gulp';
import * as server from './dist/server';
import * as test from './dist/test';
import * as lint from './dist/lint';
import * as watch from './dist/watch';

let clean = gulp.parallel(server.clean, test.clean);
clean.displayName = 'modules:clean';
gulp.task(clean);

export { server, test, lint, clean, watch };
