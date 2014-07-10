'use strict'

require('colors')

process.stdin.setEncoding('utf8')

var data = ''

process.stdin.on('readable', function () {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		for (var i = 0; i < chunk.length; i++) {
			var c = chunk[i]
			if (c === '\n') {
				process.stdin.pause()
			}
		}
		data += chunk
	}
})

process.stdin.on('end', function () {
	process.stdout.write('end\n'.green);
	process.stdout.write(data.blue);
})

process.on('SIGINT', function () {
	console.log("Caught interrupt signal");
	process.exit()
});
