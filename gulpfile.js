// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    nodemon = require('nodemon'),
    templateCache = require('gulp-angular-templatecache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 
// Styles
gulp.task('styles', function() {
  return sass('public/css/global.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('public/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('template', function () {
  return gulp.src('public/views/*.html')
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest('dist'));
});
 
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
 
// Watch
gulp.task('serve', function() {
 
  // Create LiveReload server
  livereload.listen();

  nodemon({
    script: 'server.js',
    watch: 'server.js'
  }).on('start', livereload.reload);

  // Watch .scss files
  gulp.watch('public/css/*.scss', ['styles']);
 
  // Watch .js files
  gulp.watch('public/**/*.js', ['scripts']);

  // Watch .html files
  gulp.watch('public/views/*.html', ['template']);
 
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
 
});