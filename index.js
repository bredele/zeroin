module.exports = function () {
  var callbacks = {}
  return {
    on: function (topic, cb) {
      (callbacks[topic] = callbacks[topic] || []).push(cb)
    },
    once: function (topic, cb) {

    },
    off: function (topic, cb) {
      var events = callbacks[topic]
      if (!topic) callbacks = {}
      else if (cb) events.splice(events.indexOf(cb) >>> 0, 1)
      else callbacks[topic] = []
    },
    emit: function () {
      var args = [].slice.call(arguments)
      var events = callbacks[args.shift()] || []
      events.map(function (cb) {
        cb.apply(null, args)
      })
    }
  }
}
