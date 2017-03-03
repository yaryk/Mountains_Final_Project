var gulp = require("gulp"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    cssnano = require("gulp-cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    gulpIf = require("gulp-if"),
    sync = require("browser-sync").create();

var isDevelopment = true;

// styles
gulp.task("css:own", function() {
    return gulp.src("src/styles/main.less")
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(less())
            .pipe(autoprefixer("last 2 version"))
            .pipe(cssnano())
            .pipe(gulpIf(isDevelopment, sourcemaps.write()))
            .pipe(gulp.dest("dist/css/main.css"));
});
gulp.task("css:vendor", function() {
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.css"
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
    return gulp.task([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js"
    ])
    .pipe(concat("vendor.js"))
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulp.dest("dist/js"));
});

// images
gulp.task("images", function() {
    return gulp.src("imgs/**/*.*")
    .pipe(gulpIf(!isDevelopment, imagemin()))
    .pipe("dist/imgs");
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
    gulp.watch("src/css/**/*.less", ["css:own"]);
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", sync.reload);
    gulp.watch("dist/css/main.css").on("change", sync.reload);
    gulp.watch("dist/js/main.js").on("change", sync.reload);
});

gulp.task("build", ["js:own", "css:own", "html"]);
gulp.task("default", ["build", "watch"]);