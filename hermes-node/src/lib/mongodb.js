'use strict';

const Mongorito = require('mongorito');
const config = require('./config');
const logger = require('./logger');

Mongorito.connect(config.mongo.url);

logger.debug('MongoDB connected!');

module.exports = Mongorito;
