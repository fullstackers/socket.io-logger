var debug = require('debug')('logger');
var flat = require('flat');

exports = module.exports = Logger;
exports.version = require('./../package.json').version;

/**
 * A very simple middleware for socket.io that will record the events and log
 * them to a stream.
 *
 * @return Logger
 */

function Logger (options) {
  if (!(this instanceof Logger)) return new Logger(options);

  options = options || {};

  debug('new logger');

  function logger (args, cb) {
    debug('logger args.length %s', args.length);
    try {
      // "this" is the "socket"
      logger.stream().write(logger.format(this, args) + "\n");
      cb();
    }
    catch (e) {
      debug('caught an error %s', e);
      console.trace(e);
      cb(e);
    }
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
    if ('function' === typeof arguments[0] && arguments[0].length >= 2) {
      debug('format is good');
      this._format = arguments[0];
    }
    return this;
    break;
  default:
    debug('applying format %s, %s', arguments[0], arguments[1])
    return JSON.stringify(flat.flatten(this.format().apply(this, Array.prototype.slice.call(arguments))));
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
