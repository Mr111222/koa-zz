const fs = require('fs')
const KEY_LEN = 1024
const key_COUNT = 2048
const CHATS = 'abcdefghijklmnopqrstuvwxyz1234567890'
let arr = []
for(let i=0;i<key_COUNT; i++){
  let key=''
  for(let j=0; j<KEY_LEN; j++){
    key+=CHATS[Math.floor(Math.random()*CHATS.length)]
  }
  arr.push(key)
}

fs.writeFileSync('./keys', arr.join('\n'))
console.log(`keys生成完毕`)