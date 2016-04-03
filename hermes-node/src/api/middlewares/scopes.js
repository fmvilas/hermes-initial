'use strict';

const APIError = require('../models/api_error');

function checkScope (scope) {
  return function (req, res, next) {
    if (req && req.client_token && (req.client_token.sco.indexOf('all') > -1 || req.client_token.sco.indexOf(scope) > -1)) {
      return next(null);
    }

    return next(new APIError(401, 'Unauthorized'));
  };
}

module.exports = checkScope;
