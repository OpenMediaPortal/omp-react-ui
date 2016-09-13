/*
 * @author ojourmel
 */
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var cleancss = require("gulp-clean-css");
var utils = require("gulp-util");

var TARGET = "./build";
var SOURCE = "./src";

/*
 * On debug builds, don"t concat/minify
 */
var env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

/*
 * Static dependencies
 * Not watched
 */
gulp.task("includes", function() {
    // Nothing here yet
});

/*
 * Minified and concatenated js files
 */
gulp.task("scripts", function() {
    gulp.src(SOURCE + "/js/*.js")
        .pipe(env === "development" ? utils.noop() : uglify().on("error",utils.log))
        .pipe(concat("omp.js").on("error",utils.log))
        .pipe(gulp.dest(TARGET + "/js/omp/"))
});

/*
 * Minified seperate css files
 */
gulp.task("styles", function() {
    gulp.src(SOURCE + "/css/*.css")
        .pipe(env === "development" ? utils.noop() : cleancss().on("error",utils.log))
        .pipe(gulp.dest(TARGET + "/css"));
});

/*
 * Static HTML files. Not modified
 */
gulp.task("source", function() {
    gulp.src(SOURCE + "/*.html")
        .pipe(gulp.dest(TARGET + "/"));
});

/*
 * Watch all js, css, and html
 */
gulp.task("watch", function() {
    gulp.watch([SOURCE + "/js/*.js"],
               ["scripts"]);

    gulp.watch([SOURCE + "/css/*.css"],
               ["styles"]);

    gulp.watch([SOURCE + "/*.html"],
               ["source"]);

});

/*
 * Main dev entry point
 */
gulp.task("automate", ["default", "watch"]);

/*
 * Production entry point uses simply "gulp default"
 */
gulp.task("default", ["includes", "scripts", "styles", "source"]);

/*
 * Manual wipe of TARGET dir
 */
gulp.task("clean", function() {
    return gulp.src(TARGET + "/*", {read: false})
               .pipe(clean().on("error",utils.log));
});
