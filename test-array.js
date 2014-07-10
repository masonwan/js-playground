'use strict'

require('colors')

var a = [5, 3, 1, 2, 4]
var output = ''
function onEach(value, index, array) {
	if (index === 0) {
		output = '' + value
	} else {
		output = output + ', ' + value
	}

	return value === 2;
}
var returnedValue = null

console.log(('Original array: ' + a).green)
console.log('The callback will return true if the value is 2, otherwise false.'.green)
console.log()

console.log('every() will continue when callback returns true.'.blue)
returnedValue = a.every(onEach)
console.log('Travel ' + output + ' and return ' + returnedValue)

console.log('some() will continue when callback returns false.'.blue)
returnedValue = a.some(onEach)
console.log('Travel ' + output + ' and return ' + returnedValue)

console.log('forEach() will always continue'.blue)
returnedValue = a.forEach(onEach)
console.log('Travel ' + output + ' and return ' + returnedValue)
