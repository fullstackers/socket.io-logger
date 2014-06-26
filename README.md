[![Build Status](https://travis-ci.org/turbonetix/socket.io-logger.svg?branch=master)](https://travis-ci.org/turbonetix/socket.io-logger)
[![NPM version](https://badge.fury.io/js/socket.io-logger.svg)](http://badge.fury.io/js/socket.io-logger)
[![David DM](https://david-dm.org/turbonetix/socket.io-logger.png)](https://david-dm.org/turbonetix/socket.io-logger.png)

Simple logger middleware for [socket.io](https://github.com/Automattic/socket.io "socket.io").

`$ npm install socket.io-logger`

```javascript
var fs = require('fs');
var io = require('socket.io')(3000);
var options = {stream: fs.createWriteStream('/var/log/events.log',{flags:'a'}) };
var logger = require('socket.io-logger')(options);
io.use(logger);
```

# Features

* Data is flattened with [flat](https://www.npmjs.org/package/flat "flat").
* Customized formatting support.
* Plugable interface to use with your favorite logger packages.

# API

## Logger

```javascript
var Logger = require('socket.io-logger')();
```

### Logger#

```javascript
io.use(Logger());
```

By default the logger middleware will write to `stdout`.

### Logger#(options:Object)

```javascript
var options = { 
  stream: fs.createWriteStream('/var/log/events.log', {flags:'a'}) 
  format: function (sock, args) { return { sock:sock.id, args: args}; }
};
io.use(Logger(options));
```

You can use anything as long as the `stream` has a `write` method.

```javascript
var options = {
  stream: {
    write: function (data) {
      console.log(data);
    }
  }
};
io.use(Logger(options));
```

### Logger#stream (stream:Object)

The `stream` must have a `write` method.

```javascript
var stream = fs.createWriteStream('/var/log/events.log', {flags:'a'});
var logger = Logger();
logger.stream(stream);
io.use(logger);
```

### Logger#format (format:Function)

Set a customized function to manipulate the data that will be serialized.

```javascript
var format = function (sock, args) {
  return {
    sock: sock.id,
    name: args.shift(),
    data: args
  };
};

var logger = Logger();
logger.format(format);
io.use(logger);
```

# Installation and Environment Setup

Install node.js (See download and install instructions here: http://nodejs.org/).

Clone this repository

    > git clone git@github.com:turbonetix/socket.io-logger.git

cd into the directory and install the dependencies

    > cd socket.io-logger
    > npm install && npm shrinkwrap --dev

# Running Tests

Install coffee-script

    > npm install coffee-script -g

Tests are run using grunt.  You must first globally install the grunt-cli with npm.

    > sudo npm install -g grunt-cli

## Unit Tests

To run the tests, just run grunt

    > grunt spec

## TODO
