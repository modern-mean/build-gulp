'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import * as clientBuild from './client';
import { build as buildServer } from './server';

function ok(done) {
  console.log("WTF!!!!!!!!!!!!!!", clientBuild)
  return done();
}


function client() {
  return gulp.watch(['./src/client/**/*', '!**/*.constants.js', '!**/*.values.js'], gulp.series(ok, clientBuild.build));
}
client.displayName = 'modules:watch:client';

function server() {
  return gulp.watch(['./src/server/**/*'], gulp.series(buildServer));
}
server.displayName = 'modules:watch:server';

function send(done) {
  if (process.send) {
    process.send({ ready: true });
    process.on('disconnect', () => {
      //process.exit(1);
      done();
    });
  }
}
send.displayName = 'modules:watch:ready';

let all = gulp.parallel(client, server, send);
all.displayName = 'modules:watch:all';

export { client, server, all };
