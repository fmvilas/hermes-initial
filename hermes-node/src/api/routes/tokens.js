'use strict';

const express = require('express');
const co = require('co');
const token = require('../services/tokens');

const router = express.Router();

/**
 * Creates a token for a client
 */
router.post('/', (req, res, next) => {
  co(function* () {
    const options = {
      customer_id: req.body.customer_id,
      customer_secret: req.body.customer_secret,
      scopes: req.body.scopes
    };

    const data = yield token.create(options);
    res.status(201).send(data);
  }).catch((err) => { next(err); });
});

module.exports = router;
