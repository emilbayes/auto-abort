var assert = require('assert')

module.exports = function (fn) {
  var instance

  return function () {
    if (instance) instance.abort()

    instance = fn.apply(this, arguments)
    assert.strictEqual(typeof instance.abort, 'function', 'returned instance does not have an abort function')
    return instance
  }
}
