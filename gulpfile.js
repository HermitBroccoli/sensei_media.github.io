const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagmin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');


// running server
gulp.task('server', function () {
    // setting
    browserSync({
        server: {
            baseDir: "scr"
        }
    });
    // tracking files html changes
    gulp.watch("scr/*.html").on('change', browserSync.reload);
});


// conversion sass|scss to css
gulp.task('styles', function () {
    return gulp.src("scr/sass/**/*.+(scss|sass)") // key 
        // compression format
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // rename files
        .pipe(rename({ suffix: '.min', prefix: '' }))
        // autoprefixer for all browsers
        .pipe(autoprefixer())
        // cleanCSS
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        //uploading a file
        .pipe(gulp.dest("scr/css"))
        .pipe(browserSync.stream());
});

// tracking files css changes

gulp.task('html', function () {
    return gulp.src("scr/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("scr/js/**/*.js")
        .pipe(gulp.dest("scr/js"));
});

gulp.task('fonts', function () {
    return gulp.src("scr/fonts/**/*")
        .pipe(gulp.dest("scr/fonts"));
});

gulp.task('icons', function () {
    return gulp.src("scr/icons/**/*")
        .pipe(gulp.dest("scr/icons"));
});

gulp.task('mailer', function () {
    return gulp.src("scr/mailer/**/*")
        .pipe(gulp.dest("scr/mailer"));
});

gulp.task('images', function () {
    return gulp.src("scr/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("scr/img"));
});

gulp.task('watch', function () {
    gulp.watch("scr/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("scr/*.html").on('change', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));

// starf dafault task
// gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'script', 'fonts', 'icons', 'meiler', 'html', 'imges'));