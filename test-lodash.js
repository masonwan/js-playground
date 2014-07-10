'use strict'

var winston = require('winston')
var _ = require('lodash')

var doesContain = _.contains(['Hello world'], true)
winston.info('doesContain:', doesContain)
