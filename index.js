const crypto = require('hypercore-crypto')
const hypercore = require('hypercore')
const isOptions = require('is-options')
const messages = require('./messages')

const valueEncoding = {decode, encode}

module.exports = clock

function clock (storage, key, opts) {
  if (isOptions(key)) {
    opts = key
    key = null
  }

  if (!opts) opts = {}

  opts.valueEncoding = valueEncoding

  const feed = hypercore(storage, key, opts)
  const interval = opts.interval || 1000

  feed.ready(function (err) {
    if (err) return
    if (!feed.length) feed.append({type: 'hyperclock'})

    const id = setInterval(tick, interval || 1000)
    feed.on('close', destroy)

    function destroy () {
      clearInterval(id)
    }

    function tick () {
      feed.append({
        time: Date.now(),
        random: crypto.randomBytes(32)
      })
    }
  })

  return feed
}

function decode (msg) {
  try {
    return messages.Entry.decode(msg)
  } catch (err) {
    return messages.Header.decode(msg)
  }
}

function encode (msg) {
  if (msg.type) return messages.Header.encode(msg)
  return messages.Entry.encode(msg)
}
