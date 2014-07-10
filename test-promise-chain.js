'use strict'

var Promise = require('bluebird')

Promise.resolve()
	.then(function () {
		return Promise.delay(1000)
			.then(function () {
				// TODO
				throw new Error('not implemented')
			})
	})
	.then(function () {
		console.log(2)
	})
	.done()
