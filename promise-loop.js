'use strict'

var Q = require('q')

var messages = [
	'The',
	'function',
	'to',
	'be',
	'called',
	'if',
	'the',
	'promise',
	'is',
	'fulfilled',
	'successfully',
	'with',
	'a',
	'value',
	'The',
	'value',
	'is',
	'passed',
	'as',
	'the',
	'single',
	'argument',
	'If',
	'the',
	'value',
	'is',
	'null',
	'the',
	'value',
	'is',
	'returned',
	'The',
	'value',
	'returned',
	'from',
	'the',
	'function',
	'becomes',
	'the',
	'fulfilled',
	'value',
	'of',
	'the',
	'promise',
	'returned',
	'by',
	'then',
	'If',
	'an',
	'exception',
	'is',
	'thrown',
	'while',
	'this',
	'function',
	'is',
	'being',
	'executed',
	'the',
	'promise',
	'returned',
	'by',
	'then',
	'moves',
	'into',
	'the',
	'error',
	'state',
	'world',
]

var promise = null
for (var i = 0; i < messages.length; i++) {
	var message = messages[i];

	if (promise == null) {
		promise = print(message)
	} else {
		(function (message) {
			promise = promise
				.then(function () {
					return print(message)
				})
		})(message)
	}
}

promise
	.done(function () {
		console.log('Done')
	})

function print(message) {
	return Q.delay(100)
		.then(function () {
			console.log(message)
		})
}
