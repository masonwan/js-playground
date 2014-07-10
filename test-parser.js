'use strict'

var parser = require('./symphony-parser')

var dir = '../pages'
parser.parseDir(dir)
	.fail(function (error) {
		console.error('Fail to parse the directory: ' + dir)
		console.error(error.stack)
	})
	.done(function () {
		console.log('Done')
	})
