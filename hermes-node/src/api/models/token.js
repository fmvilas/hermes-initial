'use strict';

const Model = require('mongorito').Model;

class Token extends Model {
  expose () {
    return {
      client_id: this.get('client_id'),
      token: this.get('token')
    };
  }
}

module.exports = Token;
