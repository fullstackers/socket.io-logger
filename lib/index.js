var debug = require('debug')('logger');
var pkg = require('./../package.json');
var flat = require('flat');
var Router = require('socket.io-events');

exports = module.exports = Logger;
exports.version = pkg.version;

/**
 * A very simple middleware for socket.io that will record the events and log
 * them to a stream.
 *
 * @return Logger
 */

function Logger (options) {
  if (!(this instanceof Logger)) return new Logger(options);

  options = options || {};

  debug('new logger v%s', pkg.version);

  var router = Router();
  router.on(function (sock, args, cb) {
    debug('logger args.length %s', arguments.length);
    try {
      // "this" is the "socket"
      logger.stream().write(logger.format(sock, args) + "\n");
      cb();
    }
    catch (e) {
      debug('caught an error %s', e);
      console.trace(e);
      cb(e);
    }
  });

  function logger (sock, cb) {
    debug('logger sock', sock, cb.toString());
    router(sock, cb);
  }

  logger.__proto__ = Logger.prototype;

  if (options.stream) {
    logger.stream(options.stream);
  }

  if (options.format) {
    logger.format(options.format);
  }

  return logger;
}

/**
 * The default formating function for Logger
 *
 * @param {Object} sock
 * @param {args} args
 */

Logger.defaultFormat = function (sock, args) {
  debug('defaultFormat', sock, args);
  args = args || [];
  var name = args.shift() || 'unkown';
  var data;
  switch(args.length) {
  case 0:
    data = {};
    break;
  case 1:
    data = args.shift();
    break;
  default:
    data = args;
    break;
  };
  return {
    socket: {
      id: sock.id
    },
    event: {
      name: name,
      data: data
    }
  };
};

/**
 * Either sets / gets the format function, or invokes the format 
 * function given the sock, and args.
 *
 * @api public
 * @param mixed
 * @return String
 */

Logger.prototype.format = function () {
  var args = Array.prototype.slice.call(arguments);
  debug('format args', args);

  switch(arguments.length) {
  case 0: 
    debug('get format');
    if (!this._format) {
      debug('no format');
      this.format(Logger.defaultFormat);
    }
    return this._format;
    break;
  case 1:
    debug('setting format')
    if ('function' === typeof args[0] && args[0].length >= 2) {
      this._format = args[0];
    }
    return this;
    break;
  default:
    return JSON.stringify(flat.flatten(this.format().apply(this, args)));
    break;
  }

};

/**
 * set / get the stream instance
 *
 * @api public
 * @param {Object} stream
 * @return Logger;
 */

Logger.prototype.stream = function (stream) {
  if ('undefined' !== typeof stream && 'function' === typeof stream.write) {
    this._stream = stream;
    return this;
  }
  if (!this._stream || 'function' !== typeof this._stream.write) {
    this.stream(process.stdout);
  }
  return this._stream;
};
