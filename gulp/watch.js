'use strict';

var gulp = require('gulp'),
  path = require('path'),
  util = require('gulp-util');

// Watch for changes.
gulp.task('watch', ['lintjs', 'lintsass', 'sass'], function () {
  gulp.watch([global.paths.js], ['lintjs']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['lintsass', 'sass']).on('change', logChanges);
  gulp.watch([global.paths.html]).on('change', logChanges);
});

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}