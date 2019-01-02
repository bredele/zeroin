module.exports = function (obj) {
  obj = obj || {}
  var callbacks = {}
  var emit = function (topic, values) {
    (callbacks[topic] || []).map(function (cb) {
      cb.apply(null, values)
    })
  }
  obj.on = function (topic, cb) {
    (callbacks[topic] = callbacks[topic] || []).push(cb)
    return obj
  }
  obj.off = function (topic, cb) {
    var events = callbacks[topic]
    if (!topic) callbacks = {}
    else if (cb) events.splice(events.indexOf(cb) >>> 0, 1)
    else callbacks[topic] = []
    return obj
  }
  obj.once = function (topic, cb) {
    var fn = function () {
      cb.apply(null, arguments)
      obj.off(topic, fn)
    }
    obj.on(topic, fn)
    return obj
  }
  obj.emit = function () {
    var args = [].slice.call(arguments)
    emit(args.shift(), args)
    emit('*', args)
    return obj
  }
  return obj
}
