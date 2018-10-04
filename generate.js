'use strict'

/* eslint-disable no-console */

try {
  require('worker_threads')
} catch (e) {
  console.error('Run with node --experimental-worker')
  process.exit(2)
}

const { job, stop } = require('microjob')
const Id = require('peer-id')

if (process.argv.length < 5) {
  console.error('Usage: % <type - e.g. rsa> <size - e.g. 2048> <count - e.g. 10> <output - e.g. ./ids.json>'.replace('%', process.argv.slice(0, 2).join(' ')))
  process.exit(2)
}

let [type, size, count, out] = process.argv.slice(2)
size = parseInt(size, 10)
count = parseInt(count, 10)

const gen = ({type, size}) => new Promise((resolve, reject) => {
  const Id = require('peer-id')
  Id.create({type, size}, (err, res) => err ? reject(err) : resolve(res.toJSON()))
})

async function main () {
  let base = require('base-x')(' !#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~')
  let keys = await Promise.all('.'.repeat(count).split('').map(() => job(gen, {type, size})))
  keys = await Promise.all(keys.map(key => new Promise((resolve, reject) => Id.createFromJSON(key, (err, res) => err ? reject(err) : resolve(res)))))
  keys = keys.map(key => base.encode(key.privKey.marshal())).join('"')
  require('fs').writeFileSync(out, JSON.stringify(keys))

  stop()
}

main()
