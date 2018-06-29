// This file is auto generated by the protocol-buffers cli tool

/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */

// Remember to `npm install --save protocol-buffers-encodings`
var encodings = require('protocol-buffers-encodings')
var varint = encodings.varint
var skip = encodings.skip

var Header = exports.Header = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var Entry = exports.Entry = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

defineHeader()
defineEntry()

function defineHeader () {
  var enc = [
    encodings.string
  ]

  Header.encodingLength = encodingLength
  Header.encode = encode
  Header.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (!defined(obj.type)) throw new Error("type is required")
    var len = enc[0].encodingLength(obj.type)
    length += 1 + len
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (!defined(obj.type)) throw new Error("type is required")
    buf[offset++] = 10
    enc[0].encode(obj.type, buf, offset)
    offset += enc[0].encode.bytes
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      type: ""
    }
    var found0 = false
    while (true) {
      if (end <= offset) {
        if (!found0) throw new Error("Decoded message is not valid")
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.type = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        found0 = true
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineEntry () {
  var enc = [
    encodings.varint,
    encodings.bytes
  ]

  Entry.encodingLength = encodingLength
  Entry.encode = encode
  Entry.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (!defined(obj.time)) throw new Error("time is required")
    var len = enc[0].encodingLength(obj.time)
    length += 1 + len
    if (!defined(obj.random)) throw new Error("random is required")
    var len = enc[1].encodingLength(obj.random)
    length += 1 + len
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (!defined(obj.time)) throw new Error("time is required")
    buf[offset++] = 8
    enc[0].encode(obj.time, buf, offset)
    offset += enc[0].encode.bytes
    if (!defined(obj.random)) throw new Error("random is required")
    buf[offset++] = 18
    enc[1].encode(obj.random, buf, offset)
    offset += enc[1].encode.bytes
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      time: 0,
      random: null
    }
    var found0 = false
    var found1 = false
    while (true) {
      if (end <= offset) {
        if (!found0 || !found1) throw new Error("Decoded message is not valid")
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.time = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        found0 = true
        break
        case 2:
        obj.random = enc[1].decode(buf, offset)
        offset += enc[1].decode.bytes
        found1 = true
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defined (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
}