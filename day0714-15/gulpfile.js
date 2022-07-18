const gulp = require("gulp");
const uglify = require("gulp-uglify");
const csso = require("gulp-csso");
const less = require("gulp-less");

gulp.task("test", () => {
    gulp.src("./src/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})
gulp.task("cssmin", () => {
    gulp.src(["./src/css/*.css", "./src/css/*.less"])
        .pipe(csso())
        .pipe(less())
        .pipe(gulp.dest("dist/css"))
})