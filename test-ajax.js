var request = new XMLHttpRequest()
request.addEventListener('readystatechange', function () {
	if (request.readyState === 4) {
		// If done
		console.log('request.response: ', request.response)
	}
})
request.open('get', '/')
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
request.send()
