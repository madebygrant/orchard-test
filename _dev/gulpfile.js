const { options, paths } = require('./options');

const gulp        = require('gulp'),
    browserSync   = require('browser-sync').create(),
    plumber       = require('gulp-plumber'),
    newer         = require('gulp-newer'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass')(require('sass')),
    postcss       = require('gulp-postcss'),
    cleanCSS      = require('gulp-clean-css'),
    sortMQ        = require('postcss-sort-media-queries'),
    autoprefixer  = require('autoprefixer'),
    rollup        = require('./rollup');

// Gulp tasks
const Tasks = {

    scss: () => {
        return gulp
        .src(paths.src.scss + 'main.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([sortMQ(), autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(plumber({errorHandler: options.onError}))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
    },

    js: () =>{
        return gulp
        .src([ paths.src.js + 'main.js' ])
        .pipe(concat('main.js'))
        .pipe(rename('main.js'))
        .pipe(rollup({ terser: options.terser }))
        .pipe(plumber({errorHandler: options.onError}))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());
    },

    html: () => {
        return gulp
        .src(paths.src.base + '**/*.html')
        .pipe(newer(paths.dist.base))
        .pipe(plumber({errorHandler: options.onError}))
        .pipe(gulp.dest(paths.dist.base))
        .pipe(browserSync.stream());
    },

    server: () => {
        browserSync.init({
            server: {
                baseDir: paths.dist.base
            }
        });
    },

    watch: () => {

        // BrowserSync
        browserSync.init({
            server: {
              baseDir: paths.dist.base
            }    
        });

        // HTML changes
        gulp.watch(paths.watch.html, gulp.series(Tasks.html));

        // SCSS changes
        gulp.watch(paths.watch.scss, gulp.series(Tasks.scss));

        // JavaScript changes
        gulp.watch(paths.watch.js, gulp.series(Tasks.js));
    },

    reload: (done) =>{
        browserSync.reload();
        done();
    },

}

// -------------------------------

// Gulp commands

// HTML
exports.html = gulp.series(Tasks.html);

// SCSS
exports.scss = gulp.series(Tasks.scss);

// JS
exports.js = gulp.series(Tasks.js);

// Watch
exports.watch = gulp.series(Tasks.watch);

// Build
exports.build = gulp.series(Tasks.scss, Tasks.js, Tasks.html);

// Gulp default
exports.default = gulp.series(Tasks.server);