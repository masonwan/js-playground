'use strict'

var path = require('path')
var url = require('url')

var uri = '//test:test@yes.player.vimeo.com:80/external/56673198.mobile.mp4?s=d0bb250170539edbd89eb1db2797d1a2'
var urlInfo = url.parse(uri)
var basename = path.basename(urlInfo.pathname)
console.log('urlInfo: ', urlInfo)
console.log('basename: ', basename)
