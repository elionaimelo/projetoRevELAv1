const gulp = require("gulp"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  lodash = require("lodash"),
  browsersync = require("browser-sync"),
  fileinclude = require("gulp-file-include")
  autoprefixer = require('autoprefixer')
  postcss = require('gulp-postcss');

const folder = {
  src: "src/", // aquivos fontes
  dist: "dist/", // arquivos finais
  dist_assets: "dist/assets/", //demais arquivos
};




// imagem minificada
function imageMin() {
  var out = folder.dist_assets + "images";
  return gulp
    .src(folder.src + "images/**/*")
    .pipe(newer(out))
    .pipe(imagemin())
    .pipe(gulp.dest(out));
}

// copiando fontes do src para dist
function fonts() {
  var out = folder.dist_assets + "fonts/";

  return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

// copiando html files from src para dist
function html() {
  var out = folder.dist;

  return gulp
    .src([
      folder.src + "html/*.html",
      folder.src + "html/*.ico", // favicons
      folder.src + "html/*.png",
    ])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
        indent: true,
      })
    )
    .pipe(gulp.dest(out));
}

// compilando e minificando sass
function css() {
  gulp
    .src([folder.src + "/scss/bootstrap.scss"], { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass()) // scss to css
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(folder.dist_assets + "css/"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        // renomeando
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(folder.dist_assets + "css/"));

  return gulp
    .src([folder.src + "/scss/app.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass()) 
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(folder.dist_assets + "css/"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        // renomeando app.css to app.min.css
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("./")) // source maps para app.min.css
    .pipe(gulp.dest(folder.dist_assets + "css/"));
}

// js
function javascript() {
  var out = folder.dist_assets + "js/";

  gulp
    .src([
      folder.src + "js/vendor/lib.min.js",
      folder.src + "js/vendor/app.min.js",
      
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(out))
    .pipe(
      rename({
        // renomeando app.js para app.min.js
        suffix: ".min",
      })
    )
    .pipe(uglify())
    .on("error", function (err) {
      console.log(err.toString());
    })
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(out));


  return gulp
    .src([
        folder.src + "js/app.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(out))
    .pipe(
        rename({
            suffix: ".min"
        })
    )
    .pipe(uglify())
    .on("error", function (err) {
        console.log(err.toString());
    })
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(out));
}

// live browser loading
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: folder.dist,
    },
  });
  done();
}

function reloadBrowserSync(done) {
  browsersync.reload();
  done();
}

// ouvindo todas as mudanças 
function watchFiles() {
  gulp.watch(folder.src + "html/**", gulp.series(html, reloadBrowserSync));
  gulp.watch(
    folder.src + "assets/images/**/*",
    gulp.series(imageMin, reloadBrowserSync)
  );
  gulp.watch(
    folder.src + "assets/fonts/**/*",
    gulp.series(fonts, reloadBrowserSync)
  );
  gulp.watch(folder.src + "scss/**/*", gulp.series(css, reloadBrowserSync));
  gulp.watch(
    folder.src + "js/**/*",
    gulp.series(javascript, reloadBrowserSync)
  );
}

// ouvindo todas as mudanças
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// default task
gulp.task(
  "default",
  gulp.series(html, imageMin, fonts, css, javascript, "watch"),
  function (done) {
    done();
  }
);

// build
gulp.task(
  "build",
  gulp.series(html, imageMin, fonts, css, javascript)
);
