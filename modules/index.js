'use strict';

import gulp from 'gulp';
import exit from 'gulp-exit';
import * as client from './client';
import * as server from './server';
import * as test from './test';
import * as lint from './lint';

let clean = gulp.parallel(client.clean, server.clean, test.clean);
clean.displayName = 'modules:clean';
gulp.task(clean);

export { client, server, test, lint, clean, exit };
