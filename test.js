'use strict'

var xhr = require('xhr')
var test = require('tape')
var autoAbort = require('.')

test('made up test', function (assert) {
  assert.plan(1)

  var auto = autoAbort(mock)

  auto(function () {
    assert.pass()
  })
  auto(function () {
    assert.pass()
  })

  function mock (cb) {
    var hasAborted = false

    setTimeout(function () {
      if (!hasAborted) cb()
    }, 0)

    return {abort: function () { hasAborted = true }}
  }
})

test('doesn\'t have abort function', function (assert) {
  var auto = autoAbort(mock)

  assert.throws(_ => auto())
  assert.end()

  function mock (cb) {
    return {abort: true}
  }
})

test('real-world test', function (assert) {
  assert.plan(1)

  var singleXhr = autoAbort(xhr)

  singleXhr({ url: window.location }, function () {
    assert.pass()
  })
  singleXhr({ url: window.location }, function () {
    assert.pass()
  })
})
