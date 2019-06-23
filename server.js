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




router.get('/add/:id/', async ctx=>{
	let {id} = ctx.params;
	let datas = await db.query('SELECT * FROM tab WHERE ID=?', [id])
	if(datas && datas.length>0){
		ctx.body = {err:0, message: 'success', data: datas}
	}else{
		ctx.body = {err:1, message: 'error'}
	}
})



// router.post('/add/:id/', async ctx=>{
// 	let {id} = ctx.params;
// 	let datas = await db.query('SELECT * FROM tab WHERE ID=?', [id])
// 	if(datas && datas.length>0){
// 		ctx.body = {err:0, message: 'success', data: datas}
// 	}else{
// 		ctx.body = {err:1, message: 'error'}
// 	}
// })


// new add


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