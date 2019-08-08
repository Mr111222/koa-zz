const Router = require('koa-router')
const router = new Router()
router.get('/login', async ctx=>{
  // await ctx.render('admin/login')
  ctx.body='api'
})


module.exports = router.routes();