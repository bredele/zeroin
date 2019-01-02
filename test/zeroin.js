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

test('should emit and listen event', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.on('hello', () => assert.ok('pass'))
  emitter.emit('hello')
})

test('should emit and listen event multiple times', assert => {
  assert.plan(2)
  const emitter = pubsub()
  emitter.on('hello', () => assert.ok('pass'))
  emitter.on('hello', () => assert.ok('pass'))
  emitter.emit('hello')
})
