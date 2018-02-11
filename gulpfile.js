
/*---------------------------------------------------------
 Gulp Dependencies
 --------------------------------------------------------*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const plumberNotifier = require('gulp-plumber-notifier');
const stripCSSComments = require('gulp-strip-css-comments');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');
const image = require('gulp-image');
const cssmin = require('gulp-cssmin');
const webp = require('gulp-webp');

/*---------------------------------------------------------
 Required paths for Gulp
 --------------------------------------------------------*/

const paths = {
  scss: {
    src: './src/scss/**/*.scss',
    dest: './public/',
    file: './src/scss/main.scss',
  },
  css: {
    src: './public/*.css',
    dest: './public/',
    file: 'main.css',
  },
};

/*---------------------------------------------------------
 CSS/SCSS Tasks
 --------------------------------------------------------*/

/* Configures all tasks to automate
----------------------------------*/
gulp.task('watch', () => {
  gulp.watch(paths.scss.src, ['sass']);
  gulp.watch(paths.css.src, ['clean']);
});

/* Compiles all sass linking to partials in source dir, concats, creates source map, and outputs
----------------------------------*/
gulp.task('sass', () => {
  return gulp.src(paths.scss.file)
    .pipe(plumberNotifier())
    //.pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(concat(paths.css.file))
    .pipe(plumber.stop())
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.scss.dest));
});


/* Cleans CSS Removes comments and minifies stylesheet
----------------------------------*/
gulp.task('clean', () => {
  return gulp.src(paths.css.src)
    .pipe(stripCSSComments())
    .pipe(gulp.dest(paths.css.dest));
});

/*---------------------------------------------------------
 Going Live Tasks -- Pushing to server
 --------------------------------------------------------*/

/* Complies SCSS
----------------------------------*/
gulp.task('live-sass', () => {
  return gulp.src(paths.scss.file)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(concat(paths.css.file))
    .pipe(gulp.dest(paths.scss.dest));
});

/* Minifies and cleans the CSS
----------------------------------*/
gulp.task('minify-css', () => {
  return gulp.src(paths.css.src)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.css.dest));
});

/* Puts tasks into sequence
----------------------------------*/
gulp.task('live', (callback) => {
  runSequence(
    'live-sass',
    'clean',
    'minify-css',
    callback
  );
});

/* Images
----------------------------------*/

gulp.task('image', function () {
  gulp.src('./src/images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('image-webp', function () {
  return gulp.src('./src/images/*')
    .pipe(webp())
    .pipe(gulp.dest('./public/img/webp/'));
});
//
//
// // Load our plugins
// var gulp = require( 'gulp' ),
//   sass = require( 'gulp-sass' ),  // Our sass compiler
//   notify = require( 'gulp-notify' ), // Basic gulp notification using OS
//   sourcemaps = require( 'gulp-sourcemaps' ), // Sass sourcemaps
//   autoprefixer = require( 'gulp-autoprefixer' ), // Adds vendor prefixes for us
//   svgSprite = require( 'gulp-svg-sprite' ),
//   svgmin = require( 'gulp-svgmin' ),
//   size = require( 'gulp-size' ),
//   browserSync = require( 'browser-sync' ), // Sends php, js, and css updates to browser for us
//   concat = require( 'gulp-concat' ), // Concat our js
//   uglify = require( 'gulp-uglify' ),
//   babel = require( 'gulp-babel' ),
//   del = require( 'del' ),
//   rename = require( 'gulp-rename' );
//
//
// ////////////////////////////////////////////////////////////////////////////////
// // Path Configs
// ////////////////////////////////////////////////////////////////////////////////
//
// var paths = {
//   sassPath: 'assets/sass/',
//   nodePath: 'node_modules/',
//   jsPath: 'assets/js/concat',
//   destPath: '_dist/',
//   imgPath: 'assets/img/'
// };
//
// var bsProxy = 'withdesign.dev';
//
//
// ////////////////////////////////////////////////////////////////////////////////
// // SVG Sprite Task
// ////////////////////////////////////////////////////////////////////////////////
//
// // Delete compiled SVGs before creating a new one
// gulp.task('clean:svgs', function () {
//   return del([
//     paths.destPath + 'svg/**/*',
//     paths.destPath + 'sprite/sprite.svg',
//   ]);
// });
//
// var svgConfig = {
//   mode: {
//     symbol: { // symbol mode to build the SVG
//       dest: 'sprite', // destination folder
//       sprite: 'sprite.svg', //sprite name
//       example: false // Build sample page
//     }
//   },
//   svg: {
//     xmlDeclaration: false, // strip out the XML attribute
//     doctypeDeclaration: false, // don't include the !DOCTYPE declaration
//     rootAttributes: { // add some attributes to the <svg> tag
//       width: 0,
//       height: 0,
//       style: 'position: absolute;'
//     }
//   }
// };
//
// gulp.task('svg-min', ['clean:svgs'], function() {
//   return gulp.src(paths.imgPath + 'svg/**/*.svg')
//     .pipe(svgmin())
//     .pipe(gulp.dest(paths.destPath + 'svg'))
//     .pipe(notify({
//       message: "✔︎ SVG Minify task complete",
//       onLast: true
//     }));
// });
//
// gulp.task('svg-sprite', ['svg-min'], function() {
//   return gulp.src([
//     paths.imgPath + 'svg/*.svg'
//   ])
//     .pipe(svgSprite(svgConfig))
//     .pipe(gulp.dest(paths.destPath))
//     .pipe(browserSync.reload({stream:true}))
//     .pipe(notify({
//       message: "✔︎ SVG Sprite task complete",
//       onLast: true
//     }));
// });
//
//
// ////////////////////////////////////////////////////////////////////////////////
// // Our browser-sync task
// ////////////////////////////////////////////////////////////////////////////////
//
// gulp.task('browser-sync', function() {
//   var files = [
//     '**/*.php'
//   ];
//
//   browserSync.init(files, {
//     proxy: bsProxy
//   });
// });
//
//
// ////////////////////////////////////////////////////////////////////////////////
// // CSS
// ////////////////////////////////////////////////////////////////////////////////
//
// gulp.task('css', function() {
//   gulp.src(paths.sassPath + 'app.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass({outputStyle: 'compressed'})
//       .on('error', notify.onError(function(error) {
//         return "Error: " + error.message;
//       }))
//     )
//     .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(size({showFiles: true}))
//     .pipe(gulp.dest(paths.destPath + 'css'))
//     .pipe(browserSync.stream({match: '**/*.css'}))
//     .pipe(notify({
//       message: "✔︎ CSS task complete",
//       onLast: true
//     }));
// });
//
//
// ////////////////////////////////////////////////////////////////////////////////
// // Login CSS
// ////////////////////////////////////////////////////////////////////////////////
//
// gulp.task('login-css', function() {
//   gulp.src(paths.sassPath + 'login.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass({outputStyle: 'compressed'})
//       .on('error', notify.onError(function(error) {
//         return "Error: " + error.message;
//       }))
//     )
//     .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
//     .pipe(rename('login.min.css'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(size({showFiles: true}))
//     .pipe(gulp.dest(paths.destPath + 'css'))
//     .pipe(browserSync.stream({match: '**/*.css'}))
//     .pipe(notify({
//       message: "✔︎ Login CSS task complete",
//       onLast: true
//     }));
// });
//
// // Watch our files and fire off a task when something changes
// gulp.task('watch', ['build'], function() {
//   gulp.watch(paths.sassPath + '**/*.scss', ['css']);
//   gulp.watch(paths.imgPath + 'svg/**/*.svg', ['svg-sprite']);
// });
//
// // Full gulp build, including server + watch
// gulp.task('serve', ['browser-sync', 'watch']);
//
// // Our default gulp task, which runs a one-time task
// gulp.task('build', ['css', 'svg-sprite', 'login-css']);
