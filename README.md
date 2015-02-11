# gulp-reveal


## Install

Since this is a fork, you can't npm install it.

```js
  "dependencies": {
    "gulp": "^3.8.11",
    "gulp-markdown": "^1.0.0",
    "gulp-reveal": "git+https://github.com/kurtroberts/gulp-reveal.git"
  }

```

## Example

```js
var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	reveal = require('gulp-reveal');

gulp.task('default', function () {
  gulp.src('*.md')
    .pipe(markdown())
    .pipe(reveal())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('*.md', ['default']);
});
```

## License
MIT
