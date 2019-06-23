const path = require('path')
module.exports = {
  // mysql 配置于
  DB_HOST:'localhost',
  DB_USER:'root',
  DB_PASSWORD: 'Zz111222',
  DB_NAME: 'class_tab',


  // 开发环境路径
  HTTP_ROOT: 'http://localhost:3000',

  //  上传路径
  UPLOAD_DIR: path.resolve(__dirname, './static/upload')
}