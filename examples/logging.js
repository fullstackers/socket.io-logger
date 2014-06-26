var io = require('socket.io')(3000);
var Logger = require('./..');
var options = { format: Logger.defaultFormat, stream: { write: function (line) { process.stdout.write(line); } } };
var logger = Logger(options);
io.use(logger);
io.on('done', function () {
  this.emit('done');
});

setTimeout(function () {
  var sock = require('socket.io-client').connect('ws://localhost:3000');
  sock.on('connect', function () {
    sock.emit('this');
    sock.emit('is');
    sock.emit('a');
    sock.emit('test');
    sock.emit('done');
  });
  sock.on('done', function () {
    process.exit(0);
  });
},1000);
