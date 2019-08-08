const Router = require('koa-router')
const router = new Router()
const {HTTP_ROOT} = require('../../config')


router.get('', async ctx=>{
  let bannerData = await ctx.db.query(`SELECT * FROM banner_tab`)
  let catalogData = await ctx.db.query(`SELECT * FROM catalog_tab`)
  let articleData = await ctx.db.query(`SELECT * FROM article_tab`)
  articleData.forEach(res=>{
    let oDate = new Date(res.created_time*1000)
    res.created_time = `${oDate.getFullYear()}-${oDate.getMonth()+1}-${oDate.getDate()}`
  })
  await ctx.render('www/index',{
    bannerData,
    catalogData,
    articleData,
    HTTP_ROOT
  })
})

module.exports = router.routes();