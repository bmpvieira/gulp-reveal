# gulp-reveal


## Install

Install with [npm](https://npmjs.org/package/gulp-reveal)

```
npm install gulp-reveal
```

## Example

```js
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var reveal = require('gulp-reveal');

gulp.task('default', function () {
  gulp.src('index.md')
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
