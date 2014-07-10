'use strict'

var Q = require('q')
var FS = require('q-io/fs')
var path = require('path')
var jsdom = require('jsdom')
var colors = require('colors')

var filename = path.resolve(__dirname, '../pages/ipad-mini.html')
var fileDir = path.dirname(filename)
return FS.read(filename)
	.fail(function (error) {
		console.error(util.format('Fail to read the file [%s]', filename))
		throw error
	})
	.then(function (content) {
		return Q.nfcall(jsdom.env, content)
	})
	.fail(function (error) {
		console.error('Fail to parse the DOM')
		throw error
	})
	.then(function (window) {
		var queue = [];
		[].forEach.call(window.document.querySelectorAll('body link'), function (element) {
			var relatedPath = element.href
			var filePath = path.resolve(fileDir, relatedPath)
			console.log('filePath: ' + filePath);

			(function (element) {
				var promise = FS.read(filePath)
					.then(function (css) {
						var styleElement = window.document.createElement('style')
						styleElement.setAttribute('type', 'text/css')
						styleElement.setAttribute('scoped', 'scoped')
						styleElement.appendChild(window.document.createTextNode(css))

						element.parentNode.replaceChild(styleElement, element)
						return window
					})
					.fail(function (error) {
						console.error('Fail to read [' + filePath + ']')
						console.error(error.stack)
					})
				queue.push(promise)
			})(element)
		})
		return Q.all(queue)
			.then(function () {
				return window.document.documentElement.outerHTML
			})
	})
	.then(function (html) {
		return FS.write('test-css-embed.refined.html', html)
	})
	.fail(function (error) {
		console.error('Fail to save the dynamic config')
		throw error
	})
	.done(function () {
		console.log('Done'.green)
	})
