var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssnano = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
    return gulp.src('/websrc/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concatCss("/websrc/css/style.min.css"))
        .pipe(gulp.dest('/content/css'));
});

gulp.task('less-to-one-min-css', function () {
    gulp.src(['websrc/less/*.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('style.min.css'))
        .pipe(clean({ force: true }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('content/css/'));
});