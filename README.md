[![Build Status](https://travis-ci.org/turbonetix/socket.io-logger.svg?branch=master)](https://travis-ci.org/turbonetix/socket.io-logger)
[![NPM version](https://badge.fury.io/js/socket.io-logger.svg)](http://badge.fury.io/js/socket.io-logger)
[![David DM](https://david-dm.org/turbonetix/socket.io-logger.png)](https://david-dm.org/turbonetix/socket.io-logger.png)

![Bus.IO](https://raw.github.com/turbonetix/bus.io/master/logo.png)

A socket.io-logger will log all of your `events`.

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
