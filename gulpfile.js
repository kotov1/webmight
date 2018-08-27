var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync');

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });

gulp.task('js', function() {
	return gulp.src([
		'app/libs/typed.js/lib/typed.min.js',
		'app/libs/mixitup/dist/mixitup.min.js',
		'app/js/common.js'
		])
	.pipe(concat('scripts.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		// proxy: "domain/index.php", // local server
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/*.php',
		'app/ht.access',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/style.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.js',
		'app/js/jquery-3.3.1.min.js',
		]).pipe(gulp.dest('dist/js'));

});

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));

// });

// gulp.task('rsync', function() {
// 	return gulp.src('dist/**')
// 	.pipe(rsync({
// 		root: 'dist/',
// 		hostname: 'username@yousite.com',
// 		destination: 'yousite/public_html/',
// 		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
// 		recursive: true,
// 		archive: true,
// 		silent: false,
// 		compress: true
// 	}));
// });

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
