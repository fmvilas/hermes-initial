const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const Instrumenter = require('isparta').Instrumenter;
const mocha = require('gulp-mocha');

gulp.task('test', () => {
  return gulp.src(['test/**/*.*'])
    .pipe(mocha({ reporter: 'dot', compilers: 'js:babel-core/register' }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov', 'html'],
      reportOpts: { dir: './coverage' }
    }));
});
