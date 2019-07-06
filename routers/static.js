const static = require('koa-static')
module.exports = function (router, options){
  // 设置静态文缓存时间
  options = options || {}
  options.imgage = options.imgage || 30
  options.script = options.script || 1
  options.css = options.imgage || 30
  options.other = options.other || 7 

  
  router.all(/((\.jpg)|(\.png)|(\.gif))$/i, static('./static', {
    maxAge: options.imgage*86400*1000
  }))
  router.all(/((\.js)|(\.jsx))$/i, static('./static', {
    maxAge: options.script*86400*1000
  }))

  router.all(/((\.css)|(\.scss)|(\.less))$/i, static('./static', {
    maxAge: options.css*86400*1000
  }))

  router.all('*', static('./static', {
    maxAge:options.other*86400*1000
  }))
}