const gulp = require('gulp');
//gulp sass converts sass to css
const sass = require('gulp-sass');
//cssnano converts css to minified form
const cssnano = require('gulp-cssnano');
//rev renames the assets by appending content hash to filenames so that the browser treats it as a new asset
const rev = require('gulp-rev');

gulp.task('css', function(){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
})