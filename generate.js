'use strict'

const { job, stop } = require('microjob')
const Id = require('peer-id')

let {type, size, count} = process.argv.slice(2)
size = parseInt(size, 10)
count = parseInt(count, 10)

const gen = (type, size) => new Promise((resolve, reject) => {
  const Id = require('peer-id')
  Id.create(type, size, (err, res) => err ? reject(err) : resolve(res.toJSON))
})

async function main () {
  let base = require('base-x')(' !#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~')
  let keys = await Promise.all('.'.repeat(count).split('').map(() => job(gen, type, size)))
  let keys = await Promise.all(keys.map(key => new Promise((resolve, reject) => Id.createFromJSON(key, (err, res) => err ? reject(err) : resolve(res)))))
  let keys = keys.map(key => base.encode(key.privKey.marshal())).join('"')
  require('fs').writeFileSync('./ids.json', JSON.stringify(keys))

  stop()
}

main()
