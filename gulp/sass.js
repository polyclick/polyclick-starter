'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Compile SASS with sourcemaps + livereload.
gulp.task('sass', function () {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.css));
});
