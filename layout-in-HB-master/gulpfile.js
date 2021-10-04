const gulp = require('gulp')
const browserSync = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const del = require('del')
const include = require('gulp-file-include')
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')
const postCss = require('gulp-postcss')
const mqPacker = require('css-mqpacker')



gulp.task('html', ()=>{
    browserSync.notify('Compilinig HTML')
    return gulp.src('index.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
})
gulp.task('css', () =>{
    return gulp.src(['src/style/*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade: true}))
        .pipe(postCss([
            mqPacker({sort: true})
        ]))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/style'))
        .pipe(browserSync.stream())
})
gulp.task('js', function() {
    return gulp
        .src('./src/scripts/app.js')
        .pipe(plumber())
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('img', () =>{
    return gulp.src('./src/assets/**/*.{png,svg,jpg,jpeg}')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/assets'))
        .pipe(browserSync.reload({stream: true}))
})
gulp.task('fonts', () =>{
    return gulp.src('./src/fonts/*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(browserSync.reload({stream: true}))
})
gulp.task('server', () =>{
    browserSync({
        server:{
            baseDir: 'dist',
        },
        open: false,
        notify: true
    })
})
gulp.task('clean', ()=>{
    return del('./dist/*')
})

gulp.task('watch', () =>{
    gulp.watch('index.html', gulp.series('html'))
    gulp.watch(['./src/style/*.scss', './src/style/**/*.scss'], gulp.series('css'))
    gulp.watch(['./src/scripts/*.js', './src/scripts/**/*.js'], gulp.series('js'))
    gulp.watch('./src/assets/**/*.{png,svg}', gulp.series('img'))
    gulp.watch('./src/fonts/*', gulp.series('fonts'))
})
gulp.task('create', gulp.series('clean', gulp.parallel('html','css', 'js', 'img','fonts')))
gulp.task('default', gulp.series('create', gulp.parallel('server', 'watch')))