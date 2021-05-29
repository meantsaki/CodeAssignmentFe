const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('serve',function() {
        browserSync.init({
            server: "."
        });
        gulp.watch("sass/**/*.scss", gulp.series( ['styles'] ) );
        gulp.watch("./*.html").on('change', browserSync.reload);
        gulp.watch("./js/*.js").on('change', browserSync.reload);
    }
);

gulp.task('clean', () => {
    return del([
        'css/*',
    ]);
});

// gulp.task('watch', () => {
//     gulp.watch('sass/**/*.scss', ['styles']);
// });

//gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('default', gulp.series(['styles','serve']));