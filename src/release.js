'use strict';

import gulp from 'gulp';
import { exec } from 'child_process';
import { version } from '~/package.json';
import { argv } from 'yargs';



function npmBump(done) {
  console.log(argv);
}
npmBump.displayName = 'release:npm';
gulp.task(npmBump);
