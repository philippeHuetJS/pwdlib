/*!
 * pwdlib
 * Copyright(c) 2022 Philippe Huet
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var crypto = require('crypto')
var { hotp } = require('otplib')

/**
 * Module exports.
 * @public
 */

module.exports = digit()

/**
 * Module instances.
 * @private
 */

function digit() {
  return new Digit('secp256k1')
}

/**
 * Module constructors.
 * @private
 */

function Digit(scheme) {
  var aliceKeys = crypto.generateKeyPairSync('ec', {
    namedCurve: scheme
  })

  var bobKeys = crypto.generateKeyPairSync('ec', {
    namedCurve: scheme
  })

  this.aliceSecret = crypto.diffieHellman({
    privateKey: aliceKeys.privateKey,
    publicKey: bobKeys.publicKey
  })

  this.bobSecret = crypto.diffieHellman({
    privateKey: bobKeys.privateKey,
    publicKey: aliceKeys.publicKey
  })

  this.options = { algorithm: 'sha512', encoding: 'base64' }
}

/**
 * Method to generate a code.
 *
 * @param {Number} length
 * @returns {String}
 * @public
 */

Digit.prototype.sign = function sign(length) {
  if (!length) {
    throw new TypeError('The "length" argument is required.')
  }

  if (typeof length !== 'number') {
    throw new TypeError('The "length" argument must be a number.')
  }

  if (length < 6 || length > 8) {
    throw new TypeError(
      'The "length" argument must contains between 6 and 8 digits.'
    )
  }

  hotp.options = Object.assign({}, { digits: length }, this.options)

  return hotp.generate(this.aliceSecret, 4)
}

/**
 * Method to verify a code.
 *
 * @param {String} code
 * @returns {Boolean}
 * @public
 */

Digit.prototype.verify = function verify(code) {
  if (!code) {
    throw new TypeError('The "code" argument is required.')
  }

  if (typeof code !== 'string') {
    throw new TypeError('The "code" argument must be a string.')
  }

  return hotp.check(code, this.bobSecret, 4)
}
