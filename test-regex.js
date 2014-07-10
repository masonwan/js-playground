'use strict'

var s = '<img class="clamcaseAir_lighterThanAir_img" alt="Lightest Slimmest ClamCase Pro Keyboard Case iPad Air" src="http://lghttp.5654.nexcesscdn.net/8041F9/mage/skin/frontend/pro/ccipair/images/lighter-than-air-shadow.png">'

s = s.replace('img', function (match) {
	return 'test'
})

console.log(s)
