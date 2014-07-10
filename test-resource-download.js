'use strict'

var Q = require('q')
var HTTP = require('q-io/http')
var microtime = require('microtime')
var FS = require('q-io/fs')
var path = require('path')

var sourceFilename = '../pages/style3.css'
var targetDir;
var start
Q()
	.then(function () {
		start = microtime.now()
	})
	.then(function () {
		var sourceDir = path.dirname(sourceFilename)
		var basename = path.basename(sourceFilename)
		targetDir = path.resolve(sourceDir, basename) + '-dir';
		return FS.isDirectory(targetDir)
			.then(function (isDir) {
				if (!isDir) {
					return FS.makeDirectory(targetDir)
						.fail(function (error) {
							console.error('Fail to create directory: ' + targetDir)
							console.error(error.stack)
						})
				}
			})
	})
	.then(function () {
		return FS.read(sourceFilename)
	})
	.then(function (content) {
		var cssUrlPattern = /src\(\"?([^\s]+?)\"?\)/g
		var httpUrlPattern = /^https?/
		var prefix = 'http://lghttp.5654.nexcesscdn.net/8041F9/mage/skin/frontend/pro/ccpro/images/'
		var relativePathPattern = /\.\.\/images\/(.+\.\w+)/
		var match
		var list = []

		while ((match = cssUrlPattern.exec(content)) != null) {
			var uri = match[1]
//			console.log('Testing ' + uri)

			if (httpUrlPattern.test(uri)) {
				list.push(uri)
			} else {
				// Assume it's relative
				match = relativePathPattern.exec(uri)// uri.match(relativePathPattern)
				if (match) {
					list.push(prefix + match[1])
				}
			}
		}

		return list
	})
	.then(function (list) {
		console.log('Downloading ' + list.length + ' items')
		var queue = new Array(list.length)

		list.forEach(function (url) {
			var basename = path.basename(url)
			var filename = path.resolve(targetDir, basename)
			var promise = HTTP.read(url)
				.fail(function (error) {
					console.error('Fail to download resource: ' + url)
					console.error(error.stack)
				})
				.then(function (content) {
					return FS.write(filename, content)
				})
				.fail(function (error) {
					console.error('Fail to write to ' + filename)
					console.error(error.stack)
				})

			queue.push(promise)
		})

		return Q.all(queue)
	})
	.fail(function (error) {
		console.error('Fail to download the resources')
		console.error(error.stack)
	})
	.done(function () {
		var ms = (microtime.now() - start) / 1000
		console.log('Job completed in ' + ms + ' ms')
	})

