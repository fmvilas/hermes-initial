'use strict';

const logger = require('../../lib/logger');

function errorHandler (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Unexpected error';
  logger.error(`Error ${status}: ${message}`);
  res.status(status).send({ message, status, code: err.code });
}

module.exports = errorHandler;
