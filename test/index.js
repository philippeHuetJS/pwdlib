'use strict'

var Digit = require('..')
var assert = require('assert')

describe('.sign(length)', function () {
  it('should require an argument', function () {
    var code = Digit.sign.bind(null)

    assert.throws(code, /The "length" argument.*required./)
  })

  it('should be of type number', function () {
    var code = Digit.sign.bind(null, '6')

    assert.throws(code, /The "length" argument.*number./)
  })

  it('should check a code length', function () {
    var arr = [5, 9]

    for (var idx of arr) {
      var code = Digit.sign.bind(null, idx)

      assert.throws(code, /The "length" argument.*digits/)
    }
  })

  it('should generate a code', function () {
    var code = Digit.sign(6)

    assert.ok(typeof code === 'string')
    assert.ok(code.length === 6)
  })
})

describe('.verify(code)', function () {
  it('should require an argument', function () {
    var result = Digit.verify.bind(null)

    assert.throws(result, /The "code" argument.*required./)
  })

  it('should be of type string', function () {
    var code = parseInt(Digit.sign(6))
    var result = Digit.verify.bind(null, code)

    assert.throws(result, /The "code" argument.*string./)
  })

  it('should check a random code', function () {
    var code = Math.random().toString().substring(2, 8)
    var result = Digit.verify(code)

    assert.equal(result, false)
  })

  it('should verify a code', function () {
    var code = Digit.sign(6)
    var result = Digit.verify(code)

    assert.equal(result, true)
  })
})
