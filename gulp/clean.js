'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(global.paths.dist, {read: false})
    .pipe(clean());
});