var debug = require('debug')('logger');

exports = module.exports = Logger;
exports.version = require('./../package.json').version;

function Logger () {
  if (!(this instanceof Logger)) return new Logger();

  debug('new logger');

  function logger (args, cb) {
    logger.middleware(args, cb);
  }
  logger.__proto__ = Logger.prototype;
  return logger;
}

Logger.prototype.middleware = function (args, cb) {
  args = args || []; cb = cb || noop;
  debug('logging %s %s', args, typeof cb);
};

function noop () { }
