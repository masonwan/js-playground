'use strict'

//var winston = require('winston')

var content = 'http://Hello world, https://oaisdofias, http://myurl.com';

var match = '';
var urlPattern = /http:\/\/[^\s]+/g;

while (match = urlPattern.exec(content)) {
	console.log(match)
}
