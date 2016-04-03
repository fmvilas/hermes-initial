'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const config = require('../lib/config');
const logger = require('../lib/logger');
const errorHandler = require('./middlewares/error_handler');
const cors = require('cors');
require('../lib/mongodb');

const app = express();

if (config.api.log_http_requests) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Routes
 */
const unprotected_routes = { path: [{ url: '/tokens', method: 'POST' }] };
app.use(jwt({ secret: config.jwt.secret, requestProperty: 'client_token' }).unless(unprotected_routes));
app.use('/tokens', require('./routes/tokens'));

// catch 404
app.use((req, res) => {
  logger.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, message: 'Not found' });
});

// catch errors
app.use(errorHandler);

module.exports = app;
