module.exports = function () {
  var callbacks = {}
  return {
    on: function (topic, cb) {
      (callbacks[topic] = callbacks[topic] || []).push(cb)
    },
    once: function (topic, cb) {

    },
    off: function () {},
    emit: function (topic, value) {
      callbacks[topic].map(function (cb) {
        cb(value)
      })
    }
  }
}
