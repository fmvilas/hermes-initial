'use strict';

const logger = require('../../lib/logger');

/**
 * Handles WebSocket authorization
 *
 * @param {Socket} socket
 * @param {Function} next
 */
module.exports = function authMiddleware (socket, next) {
  const client_id = socket.decoded_token.cid;

  if (client_id === undefined) {
    logger.error('Socket.IO: Authentication Error (client_id is undefined).');
    return next(new Error('Authentication Error'));
  }

  socket.client_id = client_id;
  next();
};
