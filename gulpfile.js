var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
		livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var pngquant = require('imagemin-pngquant');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');

/*gulp.task('images', function(){
  gulp.src('img/raw/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/prod/'));
});

gulp.task('jpgs', function() {
    return gulp.src('img/raw/*.jpg')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('img/prod/'));
});

gulp.task('pngs', function() {
    return gulp.src('img/raw/*.png')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('img/prod/'));
});

gulp.task('svgs', function() {
    return gulp.src('img/raw/*.svg')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('img/prod/'));
});

gulp.task('default', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});
*/

gulp.task('styles', function(){
  gulp.src(['stylesheets/sass/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('stylesheets/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('stylesheets/css/'))
		.pipe(livereload());
});


gulp.task('default', function(){
	livereload.listen();
  gulp.watch("stylesheets/sass/*.scss", ['styles']);
});