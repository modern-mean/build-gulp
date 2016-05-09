'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import * as clientBuild from './client';
import { build as buildServer } from './server';

let clientWatcher,
  serverWatcher;


function client(done) {
  clientWatcher = gulp.watch(['./src/client/**/*', '!**/*.constants.js', '!**/*.values.js'], gulp.series(clientBuild.build));
  return done();
}
client.displayName = 'modules:watch:client';

function server(done) {
  serverWatcher = gulp.watch(['./src/server/**/*'], gulp.series(buildServer));
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

let all = gulp.parallel(client, server, send);
all.displayName = 'modules:watch:all';

export { client, server, all };
