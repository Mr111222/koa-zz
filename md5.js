const crypto = require('crypto')
let obj = crypto.createHash('md5')

module.exports = {
  md5(buffer){
    obj.update(buffer)
    return obj.digest('hex')
  }
}