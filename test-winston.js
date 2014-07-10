'use strict'
var winston = require('winston')
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
	colorize: true,
	timestmap: true
})
winston.warn('hi')
setTimeout(function () {
	winston.info('info')
}, 100)
setTimeout(function () {
	winston.log('silly', "127.0.0.1 - there's no place like home");
	winston.log('debug', "127.0.0.1 - there's no place like home");
	winston.log('verbose', "127.0.0.1 - there's no place like home");
	winston.log('info', "127.0.0.1 - there's no place like home");
	winston.log('warn', "127.0.0.1 - there's no place like home");
	winston.log('error', "127.0.0.1 - there's no place like home");
	winston.info("127.0.0.1 - there's no place like home");
	winston.warn("127.0.0.1 - there's no place like home");
	winston.error("127.0.0.1 - there's no place like home");
}, 2000)
