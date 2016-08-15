'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import * as clientBuild from './client';
import { build as buildServer } from './server';

let serverWatcher;

function server(done) {
  serverWatcher = gulp.watch(['./src/**/*'], gulp.series(buildServer));
  return done();
}
server.displayName = 'modules:watch:server';

function send(done) {
  if (process.send) {
    process.send({ ready: true });
    process.on('disconnect', () => {
      clientWatcher.close();
      serverWatcher.close();
      return done();
    });
  }
}
send.displayName = 'modules:watch:ready';

let all = gulp.parallel(server, send);
all.displayName = 'modules:watch:all';

export { server, all };
