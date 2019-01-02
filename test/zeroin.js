/**
 * Dependencies
 */

const test = require('tape')
const pubsub = require('..')

test('should have the following API', assert => {
  assert.plan(4)
  const emitter = pubsub()
  assert.equal(typeof emitter.emit, 'function')
  assert.equal(typeof emitter.on, 'function')
  assert.equal(typeof emitter.once, 'function')
  assert.equal(typeof emitter.off, 'function')
})
