'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import { build as buildClient } from './client';
import { build as buildServer } from './server';


function client() {
  return gulp.watch(['./src/client/**/*', '!**/*.constants.js', '!**/*.values.js'], gulp.series(buildClient));
}
client.displayName = 'modules:watch:client';

function server() {
  return gulp.watch(['./src/server/**/*'], gulp.series(buildServer));
}
server.displayName = 'modules:watch:server';



let all = gulp.parallel(client, server);
all.displayName = 'modules:watch:all';

export { client, server, all };
