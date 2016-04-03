'use strict';

const ObjectId = require('mongodb').ObjectId;

/**
 * Ensure that ids are always instances of ObjectId
 */
module.exports = function toObjectId (id) {
  if (id instanceof ObjectId) return id;
  return new ObjectId(id);
};
