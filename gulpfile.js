'use-strict';

const gulp = require('gulp'); 
const gutil = require('gulp-util');

const del = require('del');
const runSequence = require('run-sequence');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const pug = require('gulp-pug'); 

const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

const shell = require('gulp-shell')
const child = require('child_process');


gulp.task('clean', () => {
    return del('./docs/**/*');
});

gulp.task('pug', () => {

    const pages = [
        './src/**/*.pug',
        '!./extends/**/*.pug'
    ];

    return gulp.src(pages)
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err));
            gutil.beep();
            this.emit('end');
        })
        .pipe(gulp.dest('./docs'));
});

gulp.task('scss', () => {

    const plugins = [
        require('autoprefixer'),
        require('cssnano')
    ];
    
    return gulp.src(['./src/scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./docs/css'));
});
 
gulp.task('js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./docs'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./docs/css/**/*.css', './docs/js/**/*.js', './docs/**/*.pug'], {
        notify: false,
        server: {
            baseDir: './docs'
        }
    });
});

gulp.task('build', cb => {
    return runSequence('clean', ['pug', 'js', 'scss'], cb);
});

gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', {cwd: './src'}, ['scss']);
    gulp.watch('**/*.pug', {cwd: './src'}, ['pug'])
        .on('change', () => browserSync.reload);
    gulp.watch('**/*.js', {cwd: './src'}, ['js'])
        .on('change', () => browserSync.reload);
});

gulp.task('serve', cb => {
    runSequence('build', ['browser-sync', 'watch'], cb)
});