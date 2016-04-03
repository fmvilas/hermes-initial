'use strict';

const co = require('co');
const _ = require('lodash');
const Client = require('../models/client');
const APIError = require('../models/api_error');

function clientSecretAuth (req, res, next) {
  const client_id = _.result(req, 'body.client_id') || _.result(req, 'query.client_id');
  const client_secret = _.result(req, 'body.client_secret') || _.result(req, 'query.client_secret');

  if (client_id && client_secret) {
    return co(function* () {
      const client = yield Client.findById(client_id);

      if (!client || client.get('secret') !== client_secret) return next(new APIError(401, 'Unauthorized'));

      req.client = client_id;

      next();
    });
  }

  return next(new APIError(401, 'Unauthorized'));
}

module.exports = clientSecretAuth;
