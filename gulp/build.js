'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  cssNano = require('gulp-cssnano'),
  htmlMin = require('gulp-htmlmin'),
  jspm = require('jspm'),
  pngquant = require('imagemin-pngquant'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  runSeq = require('run-sequence'),
  sass = require('gulp-sass');

// One build task to rule them all.
gulp.task('build', function (done) {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', 'shaders', 'models', done);
});

// Build SASS for distribution.
gulp.task('buildsass', function () {
  gulp.src(global.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(cssNano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist));
});

gulp.task('buildjs', function(){
  var builder = new jspm.Builder({
    baseURL: global.paths.src
  });

  builder.loadConfig(global.paths.src + '/jspm.config.js').then(function(){
    var compileJs = builder.buildStatic(global.paths.src + '/js/app.js', './dist/app.min.js', {
      minify: true,
      sourceMaps: false
    });
  });
});

// Build HTML for distribution.
gulp.task('buildhtml', function () {
  gulp.src(global.paths.html)
    .pipe(replace('css/app.css', 'app.min.css'))
    .pipe(replace('lib/system.js', 'app.min.js'))
    .pipe(replace('<script src="jspm.config.js"></script>', ''))
    .pipe(replace("<script>System.import('./js/app.js')</script>", ''))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest(global.paths.dist));
});

// Build images for distribution.
gulp.task('buildimg', function () {
  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + '/images'));
});

// Copy over the shaders
gulp.task('shaders', () => {
  return gulp.src(global.paths.shaders)
    .pipe(gulp.dest(global.paths.dist + '/shaders'));
});

// Copy over the 3d models
gulp.task('models', () => {
  return gulp.src(global.paths.models)
    .pipe(gulp.dest(global.paths.dist + '/models'));
});
