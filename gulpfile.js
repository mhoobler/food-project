// This configuration is OPTIONAL

// in order to use this file
// both gulp and gulp-sass and node-sass must be install globally
// "npm install -g node-sass gulp gulp-cli"
// type "gulp default" into the terminal
// CTRL + C / CMD + C to cancel

//please note that this configuration has to be restarted periodically due to bugs
//it doesn't always stop because your code is wrong. (It will simply crash due to race conditions with file locks.)
//simply restart if it does crash

// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var wait = require('gulp-wait');

var sassyFunction = function() { 
    return new Promise(function(resolve, reject) {
        console.log("got here");
        gulp.src('assets/scss/main-sass.scss')
            .pipe(wait(500))
            .pipe(sass())
            .pipe(gulp.dest('assets/css'))
            .on('error', function(e){
                console.log(e);
                console.log("Caught error");
            })
            .on('end', function(){
                resolve();
            });
    });
};

gulp.task('sass', sassyFunction);

gulp.task('default', gulp.series(sassyFunction, function(done) {
    gulp.watch(['assets/scss/*.scss'])
        .on('change', gulp.series(function(event, path){
            console.log("change");
            sassyFunction().then(function(){
                console.log("done");
            });
        }))
        .on('unlink', gulp.series(function(event, path){
            console.log("unlink");
            sassyFunction().then(function(){
                console.log("done");
            });
        }))
        .on('add', gulp.series(function(event, path){
            console.log("add");
            sassyFunction().then(function(){
                console.log("done");
            });
        }));
}));