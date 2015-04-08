var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream: true}));
});

gulp.task('clean:dist', function() {
  del(['dist/css/']);
});

var serve = function() {
    browserSync({
        server: "public"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', reload);
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], serve);
gulp.task('s', ['sass'], serve);
