const Koa = require('koa')
const path = require('path')
const staticFiles = require('./routers/static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const ejs = require('koa-ejs')
const view = require('koa-views')
const body = require('koa-better-body')
const session = require('koa-session')
const fs = require('fs')
const db = require('./libs/database')
const static = require('koa-static')
const config = require('./config')
const server = new Koa()
const router = new Router()



// search only data for id
router.get('/add/:id/', async ctx=>{
	let {id} = ctx.params;
	let datas = await db.query('SELECT * FROM tab WHERE ID=?', [id])
	if(datas && datas.length>0){
		ctx.body = {err:0, message: 'success', data: datas}
	}else{
		ctx.body = {err:1, message: 'error'}
	}
})


// get all datas
router.get('/all', async ctx=>{
	let datas = await db.query('SELECT * FROM tab')
	if(datas && datas.length>0){
		ctx.body = {err:0, message: 'success', data: datas}
	}else{
		ctx.body = {err:1, message: 'error'}
	}
})

// add new data to datas
router.post('/newAdd', async ctx=>{
	let {name, age} = ctx.request.fields
	let datas = ctx.db.query('INSERT INTO tab (name, age) VALUES(?,?)',[name, age])
	if(datas){
		ctx.body = {err:0, message: 'success'}
	}else{
		ctx.body = {err:1, message: 'error'}
	}
})

// update datas
router.post('/update', async ctx=>{
	let {name, age, id} = ctx.request.fields
	const keys = ['name', 'age'] // 根据传入的key值进行赋值
	let datas = ctx.db.query(`UPDATE tab SET ${keys.map(res=>(`${res}=?`)).join(',')} WHERE id=?`,[name,age,id])
	if(datas){												
		ctx.body = {err:0, message: 'success update'}
	}else{
		ctx.body = {err:1, message: 'error'}
	}
})

// del data for id
router.get('/del/:id', async ctx=>{
	let {id} = ctx.params
	let datas = ctx.db.query(`DELETE FROM tab WHERE id=${id}`)
	if(datas){
		ctx.body = {err:0, message: 'del success'}
	}else{
		ctx.body = {err:1, message: 'del error'}
	}
})


// ctx.db.query('SELECT INTO tab')
// ctx.db.query(`SELECT INTO tab WHERE id=${id}`)
// ctx.db.query('INSERT INTO tab (name, age) VALUES(?,?)',[name, age])
// ctx.db.query(`UPDATE tab SET ${keys.map(key=>(`${key}=?`)).join(',')} WHERE ID=?`, [...vals, id])
// ctx.db.query(UPDATE class_tab SET title="xx", WHERE id='1')
// ctx.db.query(`DELETE FRMO tab WHERE id=${id}`)


// 中间件
server.use(body({
	uploadDir: config.UPLOAD_DIR
}))

const staticPath = './static'
server.use(static(
	path.join(__dirname, staticPath)
));

//	加入keys
server.keys = fs.readFileSync('keys').toString().split('\n')

//	加入session
server.use(session({
	maxAge:20*60*1000,
	renew: true
}, server))

//	数据库
server.context.db = db

// 容错处理
server.use(async (ctx,next)=>{
	try{	
		await next()
	}catch(e){
		ctx.throw(500, 'Internal Server Error')
	}
})

// 渲染配置ejs
ejs(server,({
	root: path.resolve(__dirname, 'template'),
	layout: false,
	viewExt: 'ejs',
	cache: false,
	debug: false
}))





router.use('/admin', require('./routers/admin'))
router.use('/api', require('./routers/api'))
router.use('/', require('./routers/www'))

// 设置静态文件缓存时间
staticFiles(router)



server.use(router.routes())
  	.use(router.allowedMethods())
  	.listen(3000);
