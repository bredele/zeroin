module.exports = function () {
  var callbacks = {}
  var on = function (topic, cb) {
    (callbacks[topic] = callbacks[topic] || []).push(cb)
  }
  var off = function (topic, cb) {
    var events = callbacks[topic]
    if (!topic) callbacks = {}
    else if (cb) events.splice(events.indexOf(cb) >>> 0, 1)
    else callbacks[topic] = []
  }
  return {
    on: on,
    once: function (topic, cb) {
      var fn = function () {
        cb.apply(null, arguments)
        off(topic, fn)
      }
      on(topic, fn)
    },
    off: off,
    emit: function () {
      var args = [].slice.call(arguments)
      var events = callbacks[args.shift()] || []
      events.map(function (cb) {
        cb.apply(null, args)
      })
    }
  }
}
