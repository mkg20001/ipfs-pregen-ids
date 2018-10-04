'use strict'

/* eslint-env mocha */

const getId = require('..')
const Id = require('peer-id')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const {expect, assert} = chai
chai.use(dirtyChai)

describe('ipfs-pregen-ids', () => {
  it('gets a pregenerated key', (done) => {
    const key = getId()
    assert.instanceOf(key, Buffer)
    Id.createFromPrivKey(key, (err, id) => {
      expect(err).to.not.exist()
      assert.instanceOf(id, Id)
      expect(String(id.privKey.bytes)).to.equal(String(key))
      return done()
    })
  })

  it('gets a pregenerated key of a specific size', (done) => {
    const key = getId(16384)
    assert.instanceOf(key, Buffer)
    Id.createFromPrivKey(key, (err, id) => {
      expect(err).to.not.exist()
      assert.instanceOf(id, Id)
      expect(String(id.privKey.bytes)).to.equal(String(key))
      // TODO: verify keylength
      return done()
    })
  })
})
