'use strict';
var fs = require('fs'),
	gutil = require('gulp-util'),
	through = require('through2'),
	mustache = require('mustache');

function reveal(content, option, callback) {
	var view = {},
		slides = '',
		option = option || {},
		templateFile = option.template !== null ? option.template : __dirname + '/template.mustache',
		template = fs.readFileSync(templateFile, 'utf8');
	content.split('\n<hr>\n').forEach(function(slide, i) {
		var state = '';
		if (slide.match(/<h2.*\?<\/h2>/)) {
			state = ' data-state="q"';
		}
		else if (slide.indexOf('<h2') !== -1) {
			state = ' data-state="title"';
		}
		if (i === 0) {
			view.title = slide.replace(/\<h2.*\>(.*)\<(.|\n)*/g, '$1');
			state = ' data-state="front"';
		}
		slides = slides.concat('\n<section' + state + '>\n' + slide + '\n</section>\n');
	})
	view.slides = slides;
	var data = mustache.to_html(template, view);
	callback(null, data);
}

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-reveal', 'Streaming not supported'));
			return cb();
		}

		reveal(file.contents.toString(), options, function (err, data) {
			if (err) {
				this.emit('error', new gutil.PluginError('gulp-reveal', err));
			} else {
				file.contents = new Buffer(data);
				file.path = gutil.replaceExtension(file.path, '.html');
			}

			this.push(file);
			cb();
		}.bind(this));
	});
};
