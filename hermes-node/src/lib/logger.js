'use strict';

const config = require('./config.js');
const bunyan = require('bunyan');

/**
 * @param {Object} config Logger configuration
 */
function logger (config) {
  const bunyanConfig = [];

  for (const level in config.levels) {
    const bunyanLevel = config.levels[level];
    if (!bunyanLevel) continue;

    if (level === 'debug' && config.level !== 'debug') continue;

    const logger = {level};

    if (bunyanLevel === 'STDOUT') {
      logger.stream = process.stdout;
    } else if (bunyanLevel === 'STDERR') {
      logger.stream = process.stderr;
    } else if (bunyanLevel) {
      logger.path = bunyanLevel;
    } else {
      continue;
    }

    bunyanConfig.push(logger);
  }

  return bunyan.createLogger({ name: config.name, streams: bunyanConfig });
}

module.exports = logger(config.logger);
