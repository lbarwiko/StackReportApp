var gulp = require('gulp');

gulp.task('move-www', function(){
    gulp.src('./mobile/platforms/browser/www/**/*')
    .pipe(gulp.dest('./www/www/'));
});

gulp.task('default', ['move-www']);