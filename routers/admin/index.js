const Router = require('koa-router')
const fs = require('await-fs')
const path = require('path')
const router = new Router()
const {HTTP_ROOT, UPLOAD_DIR} = require('../../config')

// 同一个接口两种表现形式叫 resful
router.get('/login', async ctx=>{
  await ctx.render('admin/login')
})


// 登录成功并跳转
router.post('/login', async ctx=>{
  // 这里不做校验了
 let admins =JSON.parse((await fs.readFile(path.resolve(__dirname, '../../admins.json'))).toString())
  //  admins.forEach(res=>{
  //   if(res.username !== user){
  //     ctx.redirect(`${${HTTP_ROOT}}/admin/login?errMsg=${encodeURIComponent('该用户不存在')}`)
  //   }else if(res.password !== pass){
  //     ctx.redirect(`${${HTTP_ROOT}}/admin/login?errMsg=${encodeURIComponent('密码不对')}`)
  //   }else if(res.username == user && res.password == pass ){
  //     ctx.session['admin'] = user
  //     ctx.redirect(`http://28.5.2.238:8080/`)
  //     ctx.body="success"
  //   }
  //  })
  ctx.session['admin'] = 'admin'
  ctx.redirect(`${HTTP_ROOT}/admin/`)
})

// 未登录直接跳回login
// router.all('*', async (ctx, next) =>{
//   if(ctx.session['admin']){
//     await next()
//   }else{
//     ctx.redirect(`${${HTTP_ROOT}}/admin/login`)
//   }
// })



router.get('/',async ctx=>{ // 设置默认路径，访问跟直接跳转到banner
  ctx.redirect(`${HTTP_ROOT}/admin/banner`)
})


router.use('/banner', require('./banner'))
router.use('/catalog', require('./catalog'))
router.use('/article', require('./article'))





module.exports = router.routes();


