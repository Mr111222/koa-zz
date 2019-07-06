const Router = require('koa-router')
const fs = require('await-fs')
const path = require('path')
const common = require('./common')
const {HTTP_ROOT, UPLOAD_DIR} = require('../config')

const page_types = {
  'banner': 'banner管理',
  'article': 'article管理',
  'catalog': 'catalog管理'
}


module.exports = function(table, page_type, fields){
  const router = new Router()

  // get banner 
  router.get('/', async ctx=>{
    let datas = await ctx.db.query(`SELECT * FROM ${table}`)
    fields.forEach(async res=>{
      if(res.type == 'select'){
        res.list = await ctx.db.query(`SELECT ID, title FROM ${res.fromSql}`)
      }
    })
    await ctx.render('admin/table',{
      datas,
      HTTP_ROOT,
      fields,
      action: `${HTTP_ROOT}/admin/${page_type}`,
      type: 'view',
      page_types,
      page_type
    })
  })

  // add   common use 
  router.post('/', async ctx=>{
    let keys = []
    let vals = []
    fields.forEach(res=>{
      let {name, type} = res
      keys.push(name)
      if(type=='file'){
        vals.push (path.basename(ctx.request.fields[name][0].path))
      }else if(type == 'date'){
        vals.push (Math.floor(new Date(ctx.request.fields[name]).getTime()/1000))
      }else{
        vals.push(ctx.request.fields[name])
      }
    })

    await ctx.db.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(res=>'?').join(',')})`,vals)
    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}`)
  })

  // del 
  router.get('/del/:id', async ctx=>{
    let {id} = ctx.params
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=${id}`)
    ctx.assert(data.length, 400, 'no data')
    let rows = data[0]
    fields.forEach(async res=>{
      if(res.type == 'file'){
        await common.unlink(path.resolve(UPLOAD_DIR, rows.src))
      }
    })
    await ctx.db.query(`DELETE FROM ${table} WHERE ID=${id}`)
    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}`)
  })

  router.get('/get/:id', async ctx=>{
    let {id} = ctx.params
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=${id}`)
    if(data.length ==0){
      ctx.body = {err:1, msg: "error no data"}
    }else{
      ctx.body = {err:0,  msg: "success", data: data[0]}
    }
  })

  // modify
  router.get('/mod/:id', async ctx=>{
    let {id} = ctx.params
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=${id}`)
    ctx.assert(data.length, 400, 'no data')
    let row = data[0]
    await ctx.render(`admin/table`, {
      type: 'mod',
      HTTP_ROOT,
      datas:[],
      fields,
      oldData: row,
      action: `${HTTP_ROOT}/admin/${table}/mod/${id}`
    })
  })

  /*  
  * 修改的策略
  * 1.上传图片假如未选择默认不修改
  * 2.假如修改图片或者重新上传了图片，默认删除本地原文件（或者不删除，根据实际情况）
  * 3.在sql需要做出判断，判断是否修改了图片，即你的ctx.request.fileds 里面src字段的length,size的值是否存在
  *
  */

  router.post('/mod/:id', async ctx=>{
    let post = ctx.request.fields
    let {id} = ctx.params

    // 获取原始数据
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
    ctx.assert(data.length, 400, 'no data src')

    let paths = {}
    let keys = []
    let vals = []
    let isChange = {}

    fields.forEach(({name, type})=>{
      if(type == 'file'){
        paths[name] = data[0][name]
      }
    })
    
    fields.forEach(({name, type})=>{
      if(type == 'file'){
        if(post[name] && post[name].length && post[name][0].size){
          isChange[name] = true
          keys.push(name)
          vals.push(path.basename(post[name][0].path))
        }
      }else if(type == 'date'){
        keys.push(name)
        vals.push(Math.floor(new Date(post[name]).getTime()/1000))
      }else{
        keys.push(name)
        vals.push(post[name])
      }
    })

    // sql拼接
    await ctx.db.query(`UPDATE  ${table} SET ${keys.map(key=>(`${key}=?`)).join(',')} WHERE ID=?`, [...vals, id])

    // 删除了原文件(默认清除，可自己定义)
    fields.forEach(async ({name, type})=>{
      if(type == 'file' && isChange[name]){
        await common.unlink(path.resolve(UPLOAD_DIR, paths[name]))
      }
    })
  
    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}`)

  })


  return router.routes();

}
