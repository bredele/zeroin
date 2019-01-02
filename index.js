module.exports = function () {
  var callbacks = {}
  return {
    on: function (topic, cb) {
      (callbacks[topic] = callbacks[topic] || []).push(cb)
    },
    once: function (topic, cb) {

    },
    off: function () {},
    emit: function () {
      var args = [].slice.call(arguments)
      callbacks[args.shift()].map(function (cb) {
        cb.apply(null, args)
      })
    }
  }
}
