var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssnano = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
// var translate = require('gulp-translator');
var translate = require("gulp-translate");
var rename = require("gulp-rename");

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

gulp.task('watch', function () {
    gulp.watch(['websrc/less/*.less', 'scripts/*.js', 'index.html'], ['less-to-one-min-css']);
});


// gulp.task('translate', function () {
//     var translations = ['pl', 'en', 'ru'];
//     // var options = {
//         // defaultLang: "ru_RU",
//         // lang: ["en_GB", "ru_RU", "de_DE", "es_ES", "en_US"],
//         // dest: i18Ndest,
//         // suffix: ".json"
//     // };
//     var options = 'index.html';

//     translations.forEach(function (translation) {
//         gulp.src('*.html')
//             .pipe(translate(options))
//             .pipe(gulp.dest('dist/' + translation));
//     });
// });


gulp.task("translate.export", function () {
    return gulp

        // Get the source files. 
        .src(["*.html"])

        // Export localizable content from the template. 
        .pipe(translate().export({
            exportFilePath: "translate/export/translate.json"
        }))

        // Write the destination file. 
        .pipe(gulp.dest("artifacts"));
});


gulp.task("translate.import", function () {
    return gulp

        // Get the source files. 
        .src(["*.html"])

        // Import translated content into the template. 
        .pipe(translate(pluginConfig).import(
            {
                importFilePath: "translate/import/translate.ru.json"
            }))

        // Write the destination file. 
        .pipe(gulp.dest("artifacts"));
});


gulp.task("translate.pseudo", function () {
    return gulp
        // Get the source file. 
        .src("translate/export/translate.json")
        // Translate the contents. 
        .pipe(translate(pluginConfig).translate(
            {
                translator: "pseudo"
            }))
        // Rename the destination file. 
        .pipe(rename({ suffix: ".en" }))
        // Write the destination file. 
        .pipe(gulp.dest("translate/import"));
});

var pluginConfig = {};
// var exportConfig = {};
// var importConfig = {};
// var translateConfig = {};

// gulp.task('translate', function () {
//     gulp.pipe(translate(pluginConfig).export(exportConfig))
//         .pipe(translate(pluginConfig).import(importConfig))
//         .pipe(translate(pluginConfig).translate(translateConfig))
// });