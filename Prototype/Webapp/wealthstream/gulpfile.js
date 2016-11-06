// requirements

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var size = require('gulp-size');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');

// tasks

gulp.task('transform', function () {
	// Transform jsx to vanilla javascript
	return gulp.src('./WealthStream/static/scripts/jsx/*.jsx')
	    .pipe(browserify({
	      transform: ['babelify'],
	    }))
	    // .pipe(uglify())
      	.pipe(ext_replace('.js'))
    	.pipe(gulp.dest('./WealthStream/static/scripts/js/'))
		.pipe(size());
});

gulp.task('del', function () {
	return del(['./WealthStream/static/scripts/js']);
});

gulp.task('default', ['del'], function() {
	gulp.start('transform');
	gulp.watch('./WealthStream/static/scripts/jsx/*.jsx', ['transform'])
		.on('error', function(err) { console.log(err.toString()); this.emit('end'); });
});
