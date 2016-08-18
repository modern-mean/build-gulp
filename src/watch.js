'use strict';

import gulp from 'gulp';
import { all } from './build';

let serverWatcher;

function server(done) {
  serverWatcher = gulp.watch(['./src/**/*'], gulp.series(all));
  return done();
}
server.displayName = 'build:watch';

export { server };
