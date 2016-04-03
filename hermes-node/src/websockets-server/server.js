'use strict';

const logger = require('../lib/logger');
const config = require('../lib/config');
const socket = require('socket.io');
const socketio_jwt = require('socketio-jwt');
const authMiddleware = require('./middlewares/auth');
const sockets = {};

class WebsocketsServer {
  constructor (options) {
    super();
    this.secure = options.secure;
    this.host = options.host;
    this.port = options.port;
    this.server = options.server;
  }

  start () {
    this.io = socket.listen(this.server);
    this.io.set('origins', '*:*');

    if (this.secure) {
      this.url = `https://${this.host}:${this.port}`;
    } else {
      this.url = `http://${this.host}:${this.port}`;
    }

    this.io.use(socketio_jwt.authorize({ secret: config.jwt.secret, handshake: true }));
    this.io.use(authMiddleware);

    this.io.sockets.on('connection', this.onConnection.bind(this));
    logger.debug(`Socket server started on ${this.url}`);
  }

  /**
   * On connection event handler. Entry point for WebSockets connection.
   *
   * @param {Socket} socket
   */
  onConnection (socket) {
    sockets[socket.id] = socket;
    logger.debug(`[${socket.id}] connection accepted`);

    socket.on('message', () => this.onMessage(socket));
    socket.on('disconnect', () => this.onDisconnect(socket));
  }

  /**
   * On message event handler
   *
   * @param {Socket} socket
   * @param {Message} message
   */
  onMessage (socket, message) {
    logger.debug(`[${socket.id}] message received`);
  }

  /**
   * On disconnect event handler
   *
   * @param {Socket} socket
   */
  onDisconnect (socket) {
    logger.debug(`[${socket.id}] disconnected`);
  }
}

module.exports = WebsocketsServer;
