var gulp 	= require('gulp');
var concat 	= require('gulp-concat');

var prefixDev = 'src';
var prefixDist = 'dist';

function setupConfig(prefix){
	gulp.src(['./config/' + prefix + '_config.js', './config/server_config.js'])
	.pipe(concat('server_config.js'))
	.pipe(gulp.dest('./src/'));
}

gulp.task('build-dev', function(){
	setupConfig('src');
})

gulp.task('build-prod', function(){
	setupConfig('dist');
})

// gulp.task('build', function(){

// 	setupConfig(prefixDev);
// 	setupConfig(prefixDist);

// 	//Copy app folder
// 	gulp.src('./' + prefixDev + '/app/**/*')
// 	.pipe(gulp.dest('./' + prefixDist + '/app/'));

// 	//Copy server file
// 	gulp.src('./' + prefixDev + '/')
// 	.pipe(gulp.dest('./' + prefixDist + '/'));
// });

gulp.task("watch", function(){
	console.log("Watching for changes to config");
	gulp.watch("config/*.js", ["build"]);
});

gulp.task('default', ['watch']);