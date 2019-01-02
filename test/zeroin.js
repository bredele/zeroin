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

test('should emit event and listen/catch value', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.on('hello', (value) => assert.equal(value, 'world'))
  emitter.emit('hello', 'world')
})

test('should emit event and listen/catch event arguments', assert => {
  assert.plan(3)
  const emitter = pubsub()
  emitter.on('hello', (world, foo, bar) => {
    assert.equal(world, 'world')
    assert.equal(foo, 'foo')
    assert.equal(bar, 'bar')
  })
  emitter.emit('hello', 'world', 'foo', 'bar')
})

test('remove event listener', assert => {
  assert.plan(1)
  const emitter = pubsub()
  const fn = () => assert.fail('fail')
  emitter.on('hello', fn)
  emitter.off('hello', fn)
  emitter.emit('hello')
  assert.ok('pass')
})

test('should remove all event listeners for a given topic', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.on('hello', () => assert.fail('fail'))
  emitter.on('hello', () => assert.fail('fail'))
  emitter.off('hello')
  emitter.emit('hello')
  assert.ok('pass')
})

// test('should emit and listen event once', assert => {
//   assert.plan(1)
//   const emitter = pubsub()
//   emitter.once('hello', () => assert.ok('pass'))
//   emitter.emit('hello')
//   emitter.emit('hello')
// })
