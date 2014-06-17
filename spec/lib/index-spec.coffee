describe 'lib', ->
  
  Given -> @lib = requireSubject 'lib', {
    './../package.json':
      version: 1
  }

  describe '.version' ->

    When -> @version = @lib.verson
    Then -> expect(@version).toEqual 1

