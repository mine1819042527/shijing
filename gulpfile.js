const gulp=require('gulp');//加载gulp插件
const gulpsass=require('gulp-sass');
const html=require('gulp-minify-html');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const rename=require('gulp-rename');
const watch=require('gulp-watch');//添加此插件
const imagemin = require('gulp-imagemin');//图片压缩插件
gulp.task('copyfile',function(){
	return  gulp.src('src/css/reset.css').pipe(gulp.dest('dist/css/'));
});
gulp.task('copyfile',function(){
	return  gulp.src('src/fonts/*').pipe(gulp.dest('dist/fonts'));
});
gulp.task('uglifyhtml',function(){
	return gulp.src('src/*.html')
	.pipe(html())//执行压缩
	.pipe(gulp.dest('dist/'));
});
gulp.task('runsass',function(){
	return gulp.src('src/sass/*.scss')
	.pipe(gulpsass({outputStyle:'compressed'}))//执行编译
	.pipe(gulp.dest('dist/css/'))
});

gulp.task('alljs',function(){
	return gulp.src('src/script/js/*.js')
	.pipe(concat('all.js'))//合并以及重命名
	.pipe(gulp.dest('dist/script/js'))//输出
	.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())//压缩
	.pipe(gulp.dest('dist/script/js'));
});
gulp.task('runimg',function(){
	return gulp.src('src/img/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});
gulp.task('default',function(){
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	watch(['src/*.html','src/sass/*.scss','src/script/js/*.js'],gulp.parallel('uglifyhtml','runsass','alljs'));  //添加了 gulp.series 和 gulp.parallel 方法用于组合任务
	//gulp.parallel() –并行运行任务 
	//gulp.series() –运行任务序列,拥有先后顺序。 
});