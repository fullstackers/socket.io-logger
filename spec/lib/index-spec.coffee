describe 'lib', ->
  
  Given -> @lib = requireSubject 'lib', {
    './../package.json':
      version: 1
  }

  describe '.version', ->

    When -> @version = @lib.version
    Then -> expect(@version).toEqual 1

  describe '#', ->

    When -> @res = @lib()
    Then -> expect(typeof @res).toBe 'function'
    And -> expect(@res instanceof @lib).toBe true

