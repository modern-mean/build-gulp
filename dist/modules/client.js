'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templates = exports.values = exports.constants = exports.build = exports.vendor = exports.clean = exports.images = exports.application = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpConcat = require('gulp-concat');

var _gulpConcat2 = _interopRequireDefault(_gulpConcat);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpFile = require('gulp-file');

var _gulpFile2 = _interopRequireDefault(_gulpFile);

var _gulpImagemin = require('gulp-imagemin');

var _gulpImagemin2 = _interopRequireDefault(_gulpImagemin);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

var _mainBowerFiles = require('main-bower-files');

var _mainBowerFiles2 = _interopRequireDefault(_mainBowerFiles);

var _gulpNgConfig = require('gulp-ng-config');

var _gulpNgConfig2 = _interopRequireDefault(_gulpNgConfig);

var _gulpAngularTemplatecache = require('gulp-angular-templatecache');

var _gulpAngularTemplatecache2 = _interopRequireDefault(_gulpAngularTemplatecache);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function application() {
  let filterJS = (0, _gulpFilter2.default)(['**/*.js'], { restore: true }),
      filterCSS = (0, _gulpFilter2.default)(['**/*.css'], { restore: true });

  return _gulp2.default.src(['./client/**/*.module.js', './client/**/*.{js,css}', '!**/core.client.app.loader.js']).pipe(filterJS).pipe((0, _gulpConcat2.default)('application.js')).pipe(_gulp2.default.dest('./dist/client')).pipe(filterJS.restore).pipe(filterCSS).pipe((0, _gulpConcat2.default)('application.css')).pipe(_gulp2.default.dest('./dist/client'));
}
application.displayName = 'modules:client:application';
_gulp2.default.task(application);

function images() {
  return _gulp2.default.src(['./client/**/*.{jpg,png,gif,ico}']).pipe((0, _gulpImagemin2.default)({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
    use: [(0, _imageminPngquant2.default)()]
  })).pipe(_gulp2.default.dest('./dist/client'));
}
images.displayName = 'modules:client:images';
_gulp2.default.task(images);

function vendor() {
  let bowerFiles = (0, _mainBowerFiles2.default)();
  let filterCSS = (0, _gulpFilter2.default)(['**/*.css'], { restore: true });
  let filterJS = (0, _gulpFilter2.default)(['**/*.js', '!**/angular.js'], { restore: true });
  return _gulp2.default.src(bowerFiles).pipe(filterCSS).pipe((0, _gulpConcat2.default)('vendor.css')).pipe(_gulp2.default.dest('./dist/client')).pipe(filterCSS.restore).pipe(filterJS).pipe((0, _gulpConcat2.default)('vendor.js')).pipe(_gulp2.default.dest('./dist/client'));
}
vendor.displayName = 'modules:client:vendor';
_gulp2.default.task(vendor);

function templates() {
  return _gulp2.default.src(['./client/**/*.html']).pipe((0, _gulpAngularTemplatecache2.default)({
    root: process.env.MM_MODULE_ROOT,
    module: process.env.MM_MODULE_ANGULAR + '.templates',
    moduleSystem: 'IIFE'
  })).pipe(_gulp2.default.dest('./dist/client'));
}
templates.displayName = 'templates';
_gulp2.default.task(templates);

function clean() {
  return (0, _del2.default)(['./dist/client']);
}
clean.displayName = 'modules:client:clean';
_gulp2.default.task(clean);

function constants() {
  return (0, _gulpFile2.default)(process.env.MM_MODULE_ANGULAR + '.client.config.constants.js', process.env.MM_MODULE_CLIENT_CONSTANTS, { src: true }).pipe((0, _gulpNgConfig2.default)(process.env.MM_MODULE_ANGULAR + '.config', {
    wrap: true,
    createModule: false
  })).pipe(_gulp2.default.dest('./client/config'));
}
constants.displayName = 'modules:client:constants';
_gulp2.default.task(constants);

function values() {
  return (0, _gulpFile2.default)('core.client.config.values.js', process.env.MM_MODULE_CLIENT_VALUES, { src: true }).pipe((0, _gulpNgConfig2.default)('core.config', {
    type: 'value',
    wrap: true,
    createModule: false
  })).pipe(_gulp2.default.dest('./client/config'));
}
values.displayName = 'modules:client:values';
_gulp2.default.task(values);

let build = _gulp2.default.series(clean, _gulp2.default.parallel(constants, values), _gulp2.default.parallel(application, images, vendor, templates));
build.displayName = 'modules:client:build';
_gulp2.default.task(build);

exports.application = application;
exports.images = images;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.constants = constants;
exports.values = values;
exports.templates = templates;