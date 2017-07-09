var gulp = require('gulp'),
  sass = require('gulp-sass'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync'),
  cfn = require('cfn'),
  config = require('config-yml');

gulp.task('styles',  function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', function(cb) {
  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('browser-sync', ['nodemon', 'styles'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  // browserSync.init(null, {
  //   proxy: 'http://localhost:3000',
  //   files: ['public/*&*/*.*'],
  //   browser: 'google chrome',
  //   port: 7000
  // });
});

gulp.task('deploy:vpc', function() {

})

gulp.task('deploy:app', function() {

})

gulp.task('default', ['browser-sync']);
