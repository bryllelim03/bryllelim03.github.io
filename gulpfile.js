// var autoprefixer = require('gulp-autoprefixer');
// var changed      = require('gulp-changed');

//var concat       = require('gulp-concat');

// var flatten      = require('gulp-flatten');
// var gulp         = require('gulp');
// var imagemin     = require('gulp-imagemin');
// var jshint       = require('gulp-jshint');

//var lazypipe     = require('lazypipe');
//var merge        = require('merge-stream');

// var cssNano      = require('gulp-cssnano');
// var plumber      = require('gulp-plumber');
// var runSequence  = require('run-sequence');
// var sass         = require('gulp-sass');
// var sourcemaps   = require('gulp-sourcemaps');
// var uglify       = require('gulp-uglify');
// var manifest = require('asset-builder')('./assets/manifest.json');



var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');


gulp.task('sass', function () {
	return gulp.src('./assets/styles/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/styles'));
});

gulp.task('copyfonts', function() {
	return gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
	.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', function() {
	return gulp.src(['./bower_components/jquery/dist/jquery.min.js', './assets/scripts/main.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('image', function() {
    return gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('default',['image', 'sass', 'copyfonts', 'scripts']);

// var flatten      = require('gulp-flatten');
// var imagemin     = require('gulp-imagemin');
// var jshint       = require('gulp-jshint');
// var cssNano      = require('gulp-cssnano');
// var plumber      = require('gulp-plumber');
// var runSequence  = require('run-sequence');
// var uglify       = require('gulp-uglify');

// var manifest = require('asset-builder')('./assets/manifest.json');