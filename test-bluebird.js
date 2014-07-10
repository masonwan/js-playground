'use strict'
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
//var http = Promise.promisifyAll(require('http'))
var http = require('http')
var winston = require('winston')
require('colors')

Promise.resolve()
//	.then(function readFile() {
//		return fs.readFileAsync('../README.md')
//			.then(function (buffer) {
//				console.log(buffer.toString())
//			})
//	})
	.then(function httpGet() {
		var option = {
			host: 'www.google.com',
			path: '/'
		}
		return new Promise(function (resolve, reject) {
			var data = ''
			http.request(option, function (res) {
				res
					.on('data', function (chunk) {
						data += chunk.toString()
//					winston.info('chunk:', chunk)
					})
					.on('end', function () {
						winston.info('data:', data)
						winston.info('Done'.green)
					})
			})
				.on('error', function (error) {
					winston.error(error.stack)
					reject(error)
				})
				.end()
		})
	})
	.catch(function (error) {
		winston.error(error.stack)
	})
	.done()
