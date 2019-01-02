module.exports = function () {
  var callbacks = {}
  return {
    on: function (topic, cb) {
      (callbacks[topic] = callbacks[topic] || []).push(cb)
    },
    once: function () {},
    off: function () {},
    emit: function (topic) {
      callbacks[topic].map(function (cb) {
        cb()
      })
    }
  }
}
