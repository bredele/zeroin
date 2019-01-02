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

test('should not remove liteners if does not exist', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.off('what')
  emitter.emit('what')
  assert.ok('pass')
})

test('should remove all event listeners', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.on('hello', () => assert.fail('fail'))
  emitter.on('world', () => assert.fail('fail'))
  emitter.off()
  emitter.emit('hello')
  emitter.emit('world')
  assert.ok('pass')
})

test('should emit and listen event once', assert => {
  assert.plan(1)
  const emitter = pubsub()
  emitter.once('hello', () => assert.ok('pass'))
  emitter.emit('hello')
  emitter.emit('hello')
})

test('should emit event and listen/catch event arguments once', assert => {
  assert.plan(3)
  const emitter = pubsub()
  emitter.once('hello', (world, foo, bar) => {
    assert.equal(world, 'world')
    assert.equal(foo, 'foo')
    assert.equal(bar, 'bar')
  })
  emitter.emit('hello', 'world', 'foo', 'bar')
  emitter.emit('hello', 'beep', 'boop')
})

test('should mixin object with emitter', assert => {
  assert.plan(5)
  const obj = {}
  pubsub(obj)
  assert.equal(typeof obj.emit, 'function')
  assert.equal(typeof obj.on, 'function')
  assert.equal(typeof obj.once, 'function')
  assert.equal(typeof obj.off, 'function')
  obj.on('hello', () => assert.ok('pass'))
  obj.emit('hello')
})

test('should return emitter to allow chaining', assert => {
  assert.plan(5)
  const emitter = pubsub()
  assert.equal(emitter.on(), emitter)
  assert.equal(emitter.once(), emitter)
  assert.equal(emitter.off(), emitter)
  assert.equal(emitter.emit(), emitter)
  emitter.on('hello', () => assert.ok('pass'))
    .emit('hello')
    .once('hello', () => assert.fail('fail'))
    .off('hello')
    .emit('hello')
})

test('should listen on all events with * wildcard', assert => {
  assert.plan(2)
  const emitter = pubsub()
  emitter.on('*', () => assert.ok('pass'))
  emitter.emit('hello')
  emitter.emit('world')
})

test('should prepend listener to the beginning of the listeners array', assert => {
  assert.plan(1)
  const emitter = pubsub()
  let idx = 0
  emitter.on('hello', () => idx++)
  emitter.on('hello', () => assert.equal(idx, 0), true)
  emitter.emit('hello')
})

test('should prepend listener once to the beginning of the listeners array', assert => {
  assert.plan(1)
  const emitter = pubsub()
  let idx = 0
  emitter.on('hello', () => idx++)
  emitter.once('hello', () => assert.equal(idx, 0), true)
  emitter.emit('hello')
})

test('should return array listing eevents for which the emitter has registered listeners', assert => {
  assert.plan(2)
  const emitter = pubsub()
  assert.deepEqual(emitter.eventNames(), [])
  emitter.on('hello', function () {})
  emitter.on('bar', function () {})
  assert.deepEqual(emitter.eventNames(), ['hello', 'bar'])
})

test('should return a copy of the array of listeners for a given event', assert => {
  assert.plan(2)
  const emitter = pubsub()
  const fn = function () {}
  assert.deepEqual(emitter.listeners(), [])
  emitter.on('hello', fn)
  assert.equal(emitter.listeners('hello')[0], fn)
})

test('should return the number of listetners listening to a given event', assert => {
  assert.plan(2)
  const emitter = pubsub()
  const fn = function () {}
  assert.deepEqual(emitter.listenerCount('hello'), 0)
  emitter.on('hello', fn)
  assert.equal(emitter.listenerCount('hello'), 1)
})

// test('should have same API than Nodejs event emitter', assert => {
//   assert.plan(6)
//   const emitter = pubsub()
//   assert.equal(typeof emitter.removeAllListeners, 'function')
//   assert.equal(typeof emitter.removeListener, 'function')
//   assert.equal(typeof emitter.addListener, 'function')
//   assert.equal(typeof emitter.removeEventListener, 'function')
// })
