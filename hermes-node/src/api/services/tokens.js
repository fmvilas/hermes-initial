'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../lib/config');
const toObjectId = require('../../lib/object_id');
const Token = require('../models/token');
const Client = require('../models/client');

/**
 * Creates a JSON Web Token for a client
 *
 * @param {Object} options
 * @param {String} options.client_id Id for client
 * @param {String} options.client_secret Secret for client
 * @param {[String]} options.scopes Scopes where token will grant access to
 */
module.exports.create = function* (options) {
  if (!options.client_id) throw new Error('Missing client_id parameter.');
  if (!options.client_secret) throw new Error('Missing client_secret parameter.');
  if (!options.scopes) throw new Error('Missing scopes parameter.');

  const client = yield Client.findById(options.client_id);
  if (!client) throw new Error('Client does not exist');

  let token = yield Token.where('client_id', toObjectId(options.client_id)).findOne();

  if (token) {
    token.set('token', generateJWT(options.client_id, options.scopes));
  } else {
    token = new Token({
      client_id: client.get('_id'),
      token: generateJWT(options.client_id, options.scopes)
    });
  }

  yield token.save();
  return token.expose();
};

/**
 * Generates a JSON Web Token
 *
 * @param  {String} cid Client id
 * @param  {Array<String>} sco Scopes
 * @return {String}
 */
function generateJWT (cid, sco) {
  return jwt.sign({ cid, sco }, config.jwt.secret);
}
