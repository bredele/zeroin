/**
 * Create event emitter or mixin given object with event
 * emitter.
 *
 * @param {Object?} obj
 * @return {Object} obj
 * @api public
 */

module.exports = function (obj) {
  obj = obj || {}

  /**
   * Listeners store.
   * @type {Object}
   */

  var callbacks = {}

  /**
   * Emit event with a given topic.
   *
   * @param {String} topic
   * @param {Array} values
   * @api private
   */

  var emit = function (topic, values) {
    (callbacks[topic] || []).map(function (cb) {
      cb.apply(null, values)
    })
  }

  /**
   * Listen event and execute given callback.
   *
   * Examples:
   *
   *  emitter.on('hello', cb)
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.on = function (topic, cb) {
    (callbacks[topic] = callbacks[topic] || []).push(cb)
    return obj
  }

  /**
   * Remove all event listeners, specific listener or
   * all listeners for a given event.
   *
   * Examples:
   *
   *  emitter.off('hello')
   *  emitter.off('hello', fn)
   *  emitter.off()
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.off = function (topic, cb) {
    var events = callbacks[topic]
    if (!topic) callbacks = {}
    else if (cb) events.splice(events.indexOf(cb) >>> 0, 1)
    else callbacks[topic] = []
    return obj
  }

  /**
   * Listen event once and execute given callback.
   *
   * Examples:
   *
   *  emitter.once('hello', cb)
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.once = function (topic, cb) {
    var fn = function () {
      cb.apply(null, arguments)
      obj.off(topic, fn)
    }
    obj.on(topic, fn)
    return obj
  }

  /**
   * Emit event
   *
   * Examples:
   *
   *  emitter.emit('hello')
   *  emitter.emit('hello', 'world')
   *  emitter.emit('hello', 'world', 'universe')
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.emit = function () {
    var args = [].slice.call(arguments)
    emit(args.shift(), args)
    emit('*', args)
    return obj
  }

  return obj
}
