var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    minifyHTML = require('gulp-minify-html'),
    reload = browserSync.reload,
    del = require('del');

var globs = {
  sass: 'app/styles/sass/styles.scss',
  css: 'app/styles/css/styles.css',
  js: 'app/scripts/main.js',
  html: 'app/index.html',
  image: 'app/assets/images/*',
  folder: [
    'dist/styles/css',
    'dist/scripts/js',
    'dist/images',
    'app/styles/css',
    'app/scripts/js',
    'app/images',
    'dist'
  ]
}

// Serve
gulp.task('serve', function () {
  browserSync({
    notify: false,
    logPrefix: 'BrowserSync',
    server: __dirname + '/dist'
  });
});

// HTML
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(globs.html)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(globs.folder[6]))
    .pipe(notify({ message: 'HTML task complete' }));
});

// Styles
gulp.task('styles', function() {
  return sass(globs.sass, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(globs.folder[0]))
    .pipe(gulp.dest(globs.folder[3]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(globs.folder[0]))
    .pipe(gulp.dest(globs.folder[3]))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(globs.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(globs.folder[1]))
    .pipe(gulp.dest(globs.folder[4]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(globs.folder[1]))
    .pipe(gulp.dest(globs.folder[4]))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(globs.image)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(globs.folder[2]))
    .pipe(gulp.dest(globs.folder[5]))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del([globs.css, globs.folder[1] + '/main.js'], cb)
});

// Watch
gulp.task('watch', function() {
  gulp.watch(globs.sass, ['styles']);
  gulp.watch(globs.js, ['scripts']);
  gulp.watch(globs.image, ['images']);
  gulp.watch(globs.html, ['html']);
  gulp.watch(globs.html).on('change', reload);
  gulp.watch(globs.image).on('change', reload);
  gulp.watch(globs.folder[0] + '/*').on('change', reload);
  gulp.watch(globs.folder[1] + '/*').on('change', reload);
  gulp.watch(globs.folder[2] + '/*').on('change', reload);
  gulp.watch(globs.folder[6] + '/*').on('change', reload);
});

// Default task
gulp.task('default', ['serve', 'watch', 'clean'], function() {
});
