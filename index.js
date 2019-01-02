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
    var listeners = obj.listeners(topic)
    listeners.map(function (cb) {
      cb.apply(null, values)
    })
    return listeners
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
   * @param {Boolean?} prepend
   * @api public
   */

  obj.on = obj.addListener = function (topic, cb, prepend) {
    if (typeof cb === 'function') {
      var listeners = callbacks[topic] = callbacks[topic] || []
      listeners.splice(prepend ? 0 : listeners.length, 0, cb)
      return obj
    } else return obj.promise(topic, !!cb)
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

  obj.off = obj.removeAllListeners = obj.removeListener = function (topic, cb) {
    var events = callbacks[topic]
    if (!topic) callbacks = {}
    else if (cb) events.splice(events.indexOf(cb), 1)
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
   * @param {Boolean?} prepend
   * @api public
   */

  obj.once = function (topic, cb, prepend) {
    if (typeof cb === 'function') {
      var fn = function () {
        cb.apply(null, arguments)
        obj.off(topic, fn)
      }
      obj.on(topic, fn, prepend)
      return obj
    }
    return obj.promise(topic, !!cb)
  }

  /**
   * Create promise listener for given event name.
   *
   * @param {String} topic
   * @param {Boolean} prepend
   * @return {Promise}
   * @api public
   */

  obj.promise = function (topic, prepend) {
    return new Promise(function (resolve) {
      obj.once(topic, resolve, prepend)
    })
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
    var type = args.shift()
    var listeners = emit(type, args)
    emit('*', [type].concat(args))
    return listeners.length > 0
  }

  /**
   * Return Array of events for which the emitter hs registered events.
   *
   * @return {Array}
   * @api public
   */

  obj.eventNames = function () {
    return Object.keys(callbacks)
  }

  /**
   * Returns a copy of the array of listeners for the event named
   *
   * @param {String} name
   * @return {Array}
   * @api public
   */

  obj.listeners = function (name) {
    return (callbacks[name] || []).slice()
  }

  /**
   * Returns number of listeners for the event named
   *
   * @param {String} name
   * @return {Number}
   * @api public
   */

  obj.listenerCount = function (name) {
    return obj.listeners(name).length
  }

  /**
   * PrependListener nodejs compatible.
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.prependListener = function (topic, cb) {
    return obj.on(topic, cb, true)
  }

  /**
   * PrependOnceListener nodejs compatible.
   *
   * @param {String} topic
   * @param {Function} cb
   * @api public
   */

  obj.prependOnceListener = function (topic, cb) {
    return obj.once(topic, cb, true)
  }

  /**
   * Expose setMaxListeners and getMaxListeners for nodejs compatibility.
   *
   * @api public
   */

  obj.setMaxListeners = obj.getMaxListeners = function () {
    return Infinity
  }

  return obj
}
