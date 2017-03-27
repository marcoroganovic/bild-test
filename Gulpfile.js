const gulp = require("gulp");
const sass = require("gulp-sass");
const pug  = require("gulp-pug");
const bSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const pump = require("pump");
const concat = require("gulp-concat");


gulp.task("pages", () => {
  return gulp.src("pages/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./build"))
    .pipe(bSync.stream());
});


gulp.task("sass", () => {
  return gulp.src("./styles/main.sass")
    .pipe(sass({ outputStyle: "compressed"}))
    .pipe(gulp.dest("./build"))
    .pipe(bSync.stream());
});


gulp.task("scripts", (cb) => {
  pump([
    gulp.src(["vendor/jquery.min.js", "vendor/film-roll.min.js", "scripts/app.js"]),
    uglify(),
    concat("app.js"),
    gulp.dest("build"),
    bSync.stream()
  ], cb);
});


gulp.task("images", () => {
  return gulp.src("assets/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/assets"))
    .pipe(bSync.stream());
});


gulp.task("serve", ["pages", "sass", "scripts", "images"], () => {
    bSync.init({ server: "./build" });
    gulp.watch("styles/**/*.sass", ["sass"]);
    gulp.watch("pages/**/*.pug", ["pages"]);
    gulp.watch("scripts/*.js", ["scripts"]);
    gulp.watch("assets/*", ["images"]);
});


gulp.task("default", ["serve"]);
