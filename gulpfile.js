/**
 * Plugin includes
 */
/** npm install --save gulp gulp-sass gulp-sourcemaps gulp-postcss autoprefixer bourbon jshint gulp-jshint gulp-uglify gulp-concat gulp-rename merge-stream */
 var gulp = require('gulp'),

 	 scss = require('gulp-sass'),
 	 sourcemaps = require('gulp-sourcemaps'),
 	 postcss = require('gulp-postcss'),
 	 autoprefixer = require('autoprefixer'),
 	 bourbon = require('bourbon');

 	 jshint = require('gulp-jshint'),
 	 uglify = require('gulp-uglify'),

 	 concat = require('gulp-concat'),
 	 rename = require('gulp-rename'),

 	 merge = require('merge-stream');

 /**
 * Custom Gulp tasks for source files
 */

 /** SCSS */
 gulp.task('scss', function() {
 	var processors = [
        autoprefixer({browsers: ['last 2 version']})
    ];
    var backend = gulp.src('source/scss/main.scss')
	 	.pipe(sourcemaps.init())
		.pipe(
			scss({
				outputStyle: 'compact',
				includePaths: bourbon.includePaths
			})
			.on('error', scss.logError)
		)
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(rename('core.css'))
		.pipe(gulp.dest('css/'));

	// var frontend = gulp.src('source/suppfactsfront.scss')
	//  	.pipe(sourcemaps.init())
	// 	.pipe(
	// 		scss({
	// 			outputStyle: 'compact',
	// 			includePaths: bourbon.includePaths
	// 		})
	// 		.on('error', scss.logError)
	// 	)
	// 	.pipe(postcss(processors))
	// 	.pipe(sourcemaps.write())
	// 	.pipe(gulp.dest('css/'));

	return merge(backend);
 });

 gulp.task('vendorscss', function() {
	return gulp.src('source/vendor/vendor.scss')
		.pipe(
			scss({
				outputStyle: 'compressed'
			})
			.on('error', scss.logError)
		)
		.pipe(rename('vendor.css'))
		.pipe(gulp.dest('css/'));
 });

 /** LINT */
 gulp.task('lint', function() {
	return gulp.src('source/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
 });


 /** CONCAT & MINIFY */
 gulp.task('scripts', function() {
	return gulp.src('source/*.js')
		.pipe(uglify())
		.pipe(concat('core.js'))
		.pipe(gulp.dest('js/'));
 });

 /** VENDOR CONCAT */
 gulp.task('vendorjs', function() {
	return gulp.src('source/vendor/*.js')
		.pipe(uglify())
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('js/'));
 });

 // gulp.task('watch', function() {
 // 	gulp.watch('source/scss/*.scss', ['scss']);
 // 	gulp.watch('source/scss/*/*.scss', ['scss']);
 // 	gulp.watch('source/js/*.js', ['lint', 'scripts']);
 // 	gulp.watch('source/js/modules/*.js', ['lint', 'scripts']);
 // 	gulp.watch('source/js/vendor/*.js', ['vendorjs']);
 // });

 // gulp.task('default', ['watch']);
 gulp.task('css', ['scss']);
 gulp.task('js', ['lint', 'scripts']);
 gulp.task('vendor', ['vendorscss', 'vendorjs']);