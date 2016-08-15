'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import { build as buildServer } from './server';

let serverWatcher;

function server(done) {
  serverWatcher = gulp.watch(['./src/**/*'], gulp.series(buildServer));
  return done();
}
server.displayName = 'build:watch';

function send(done) {
  if (process.send) {
    process.send({ ready: true });
    process.on('disconnect', () => {
      serverWatcher.close();
      return done();
    });
  }
}
send.displayName = 'build:watch:ready';

let all = gulp.parallel(server, send);
all.displayName = 'build:watch:all';

export { server, all };
