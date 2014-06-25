describe 'lib', ->
  
  Given -> @lib = requireSubject 'lib',
    './../package.json':
      version: 1
  Given -> @args = []
  Given -> @cb = jasmine.createSpy 'cb'

  describe '.version', ->

    When -> @version = @lib.version
    Then -> expect(@version).toEqual 1

  describe '#', ->

    Given -> @res = @lib()
    Given -> spyOn @res, 'middleware'
    When -> @res @args, @cb
    Then -> expect(typeof @res).toBe 'function'
    And -> expect(@res instanceof @lib).toBe true
    And -> expect(@res.middleware).toHaveBeenCalledWith @args, @cb
