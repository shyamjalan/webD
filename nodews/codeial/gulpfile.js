const gulp = require('gulp');
//gulp sass converts sass to css
const sass = require('gulp-sass');
//cssnano converts css to minified form
const cssnano = require('gulp-cssnano');
//rev renames the assets by appending content hash to filenames so that the browser treats it as a new asset if content is changed
const rev = require('gulp-rev');
//uglify is used to minify the js files
const uglify = require('gulp-uglify-es').default;
//imagemin is used to compress image files
const imagemin = require('gulp-imagemin');
const path = require('path');
const del = require('del');

gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    del.sync('./assets/css');
    done();
});

gulp.task('scss', function(done){
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    done();
});

gulp.task('css', function(done){
    gulp.src('./assets/css/**/*.css', {base: path.join(process.cwd(), 'assets')})
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{
        base: process.cwd()+'./public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', function(done){
    gulp.src('./assets/js/**/*.js', {base: path.join(process.cwd(), 'assets')})
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
        base: process.cwd()+'./public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', function(done){
    gulp.src('./assets/images/**/*.+(png|jpg|svg|jpeg)', {base: path.join(process.cwd(), 'assets')})
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json', {
        base: process.cwd()+'./public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('build', gulp.series('clean:assets', 'scss', 'css', 'js', 'images'), function(done){
    done(); 
})