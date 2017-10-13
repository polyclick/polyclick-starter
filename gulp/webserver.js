'use strict';

var gulp = require('gulp'),
  webserver = require('gulp-webserver');

// Start local dev server.
gulp.task('webserver', function () {
  return gulp.src(global.paths.src)
    .pipe(webserver({
      livereload: true
    }));
});
