var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});

gulp.task('sass', function() {

    gulp.src('sass/style.scss')

    .pipe(sourcemaps.init())

    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))

    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

    .pipe(sourcemaps.write(''))

    .pipe(gulp.dest(''))

});

gulp.task('js-uglify', function() {

  gulp.src('js/src/**/*.js')
  
  .pipe(uglify('custom.min.js'))
  
  .pipe(gulp.dest('js'))

});

gulp.task('watch', function(){

    livereload.listen();

    gulp.watch('sass/**/*.scss', ['sass']);

    gulp.watch('js/src/**/*.js', ['js-uglify']);

    gulp.watch(['style.css', '**/*.php', 'js/src/**/*.js'], function (files){
        livereload.changed(files)
    });

});