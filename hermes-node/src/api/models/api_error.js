'use strict';

class APIError extends Error {
  construct (status, message, code) {
    super();
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

module.exports = APIError;
