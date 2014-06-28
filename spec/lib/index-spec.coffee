EventEmitter = require('events').EventEmitter
Flat = require 'flat'

describe 'lib', ->

  Given -> @sock = new EventEmitter
  Given -> @sock.id = 1
  Given -> @args = ['some event', {some: 'data'}]
  Given -> @cb = jasmine.createSpy 'cb'
  Given -> @line = '{"socket.id":1,"event.name":"some event","event.data.some":"data"}'
  
  Given -> @lib = requireSubject 'lib',
    './../package.json':
      version: 1
    flat: Flat

  describe '.version', ->

    When -> @version = @lib.version
    Then -> expect(@version).toEqual 1

  describe '#defaultFormat', ->

    When -> @res = @lib.defaultFormat @sock, @args
    Then -> expect(@res).toEqual
      socket:
        id: 1
      event:
        name: 'some event'
        data:
          some: 'data'

  describe '#', ->

    When -> @res = @lib()
    Then -> expect(typeof @res).toBe 'function'
    And -> expect(@res instanceof @lib).toBe true

  describe '#(options:Object)', ->

    Given -> @options = stream: write: ->
    When -> @res = @lib @options
    Then -> expect(typeof @res).toBe 'function'
    And -> expect(@res instanceof @lib).toBe true
    And -> expect(@res.stream()).toEqual @options.stream

  describe 'prototype', ->

    Given -> @logger = @lib()

    describe.only '# (sock:Object, args:Array)', ->

      Given -> @packet = data: @args
      Given -> @stream = jasmine.createSpyObj 'stream', ['write']
      Given -> @logger.stream @stream
      Given -> @logger @sock, @cb
      When -> @sock.onevent @packet
      Then -> expect(@stream.write).toHaveBeenCalled()
      And -> expect(@stream.write.argsForCall[0][0]).toEqual @line + '\n'

    describe '#format', ->

      When -> @format = @logger.format()
      Then -> expect(typeof @format).toBe 'function'
      And -> expect(@format.length).toBe 2
      And -> expect(@format).toEqual @lib.defaultFormat

    describe '#format (format:Function)', ->

      Given -> @format = (a, b) ->
      When -> @logger.format @format
      Then -> expect(@logger.format()).toEqual @format

    describe '#format (sock:Object, args:Array)', ->

      When -> @res = @logger.format @sock, @args
      And -> expect(@res).toEqual @line

    describe '#stream', ->

      When ->  @stream = @logger.stream()
      Then -> expect(typeof @stream).toBe 'object'
      And -> expect(typeof @stream.write).toBe 'function'

    describe '#stream (stream:Object)', ->

      Given -> @stream = write: ->
      When -> @logger.stream @stream
      Then -> expect(@logger.stream()).toEqual @stream

    describe '#stream (stream:mixed)', ->

      Given -> @stream = 'crap'
      Given -> @existing = @logger.stream()
      When -> @logger.stream @stream
      Then -> expect(@logger.stream()).toEqual @existing
