var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    nano = require("gulp-cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    gulpIf = require("gulp-if"),
    sync = require("browser-sync").create();

var isDevelopment = false;

// styles
gulp.task("css:own", function() {
    return gulp.src("src/styles/main.less")
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(less())
            .pipe(autoprefixer("last 2 version"))
            .pipe(nano())
            .pipe(gulpIf(isDevelopment, sourcemaps.write()))
            .pipe(gulp.dest("dist/css/"));
});
gulp.task("css:vendor", function() {
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/flickity/dist/flickity.min.css",
        "node_modules/jquery-bar-rating/dist/themes/fontawesome-stars.css",
        "node_modules/toastr/build/toastr.css",
        "node_modules/magnific-popup/dist/magnific-popup.css",
        "node_modules/datatables.net-bs/css/dataTables.bootstrap.css"
    ])
    .pipe(gulpIf(!isDevelopment, nano()))
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("dist/css"));
});
// scripts 
gulp.task("js:own", function() {
    return gulp.src("src/js/main.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("js:vendor", function() {
    return gulp.src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "node_modules/jquery-bar-rating/dist/jquery.barrating.min.js",
        "node_modules/masonry-layout/dist/masonry.pkgd.min.js",
        "node_modules/flickity/dist/flickity.pkgd.min.js",
        "node_modules/salvattore/dist/salvattore.min.js",
        "node_modules/jquery-validation/dist/jquery.validate.js",
        "node_modules/toastr/toastr.js",
        "node_modules/datatables.net/js/jquery.dataTables.js",
        "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
        "node_modules/datatables.net-bs/js/dataTables.bootstrap.js",
        "src/js/paraxify.js"
        
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulp.dest("dist/js"));
});
// images
gulp.task("images", function() {
    return gulp.src("imgs/**/*.*")
    .pipe(gulpIf(!isDevelopment, imagemin()))
    .pipe(gulp.dest("dist/imgs/"));
});

// html 
gulp.task("html", function() {
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist/"));
});

gulp.task("watch", ["build"] ,function() {
    sync.init({
        server: "dist"
    })

    gulp.watch("src/js/*.js", ["js:own"]);
    gulp.watch("src/styles/**/*.less", ["css:own"]);
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", sync.reload);
    gulp.watch("dist/css/main.css").on("change", sync.reload);
    gulp.watch("dist/js/main.js").on("change", sync.reload);
});

gulp.task("build", ["js:own", "css:own", "html"]);
gulp.task("deploy", ["js:own", "css:own", "html", "images", "js:vendor", "css:vendor"]);
gulp.task("default", ["build", "watch"]);