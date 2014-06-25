var debug = require('debug')('logger');

exports = module.exports = Logger;
exports.version = require('./../package.json').version;

function Logger () {
  if (!(this instanceof Logger)) return new Logger();
  function logger () {

  }
  logger.__proto__ = Logger.prototype;
  return logger;
}

Logger.prototype = {}
