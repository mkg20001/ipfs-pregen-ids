# ipfs-pregen-ids

Pregenerated peerIDs for IPFS

# Usage

```js
const getId = require('ipfs-pregen-ids')
console.log(getId(size).toString('base64')) // gets a private key buffer
console.log(await getId.peerId()) // gets a peer-id (NOTE: requires peer-id module)
```

# API

`getId(size)`:
  - `Number size`: Keysize to get pregenerated ids for. Allowed values: `16384`, `8192`, `4096`, `2048`, `1024`, `512`
`getId.peerId(size[, cb])`:
  - `Number size`: Keysize to get pregenerated ids for. Allowed values: `16384`, `8192`, `4096`, `2048`, `1024`, `512`
  - `Function cb`: Callback. If not set returns a promise
