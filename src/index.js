
'use strict'

const protobuf = require('protons')
const pbm = protobuf(require('libp2p-crypto/src/keys/keys.proto'))
const prepare = (d) => shuffle(d.split('"'))
const prom = require('promisify-es6')

let pid
try {
  pid = require('peer-id') // optional
} catch (e) {
  // pass
}

const base = require('base-x')(' !#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~') // "compression" aka "whatever part of ascii can be put into a JSON string without needing to get escaped"-base

const ids = {
  16384: prepare(require('./ids.16384.json')),
  8192: prepare(require('./ids.8192.json')),
  4096: prepare(require('./ids.4096.json')),
  2048: prepare(require('./ids.2048.json')),
  1024: prepare(require('./ids.1024.json')),
  512: prepare(require('./ids.512.json'))
}

/**
 * Shuffles array in place.
 * Credit: https://stackoverflow.com/a/6274381/3990041
 * @param {Array} a An array containing the items.
 * @returns {Array}
 */
function shuffle (a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

/**
  * Gets pregenerated key
  * @param {Number} size Keysize to get pregenerated key for default=2048
  * @returns {String} base64 encoded private key
  */
module.exports = (size) => {
  if (!size) {
    size = 2048
  }

  if (!ids[size]) {
    throw new Error('Keysize ' + size + ' invalid or unsupported!')
  }

  if (!ids[size].length) { // TODO: should this maybe re-use ids?
    throw new Error('Ran out of pregenerated IDs! What do you even need this many for?')
  }

  const id = ids[size].pop()

  return pbm.PrivateKey.encode({ // this is needed because the keys aren't wrapped in the usual privateKey pbuf container to save space
    Type: pbm.KeyType.RSA,
    Data: base.decode(id)
  })
}

module.exports.peerId = prom((size, cb) => {
  if (!pid) {
    throw new Error('ipfs-pregen-ids.peerId() requires "peer-id" to be installed')
  }

  pid.createFromPrivKey(module.exports(size), cb)
})
