koa 
koa 

const Koa = require('koa')

const server = new Koa()

const static = require('koa-static')

const body = require('koa-better-body')  // 获取所有地址栏的参数(get, post , all)

const session = require('koa-session')

const mysql = require('mysql')

const co = require('co-mysql')

// 容错处理 也 可以在路由处进行处理
server.use(async (ctx,next)=>{
	try{	
		await next()
	}catch(e){
		ctx.body = 'database is error'
	}
})
//-------------------------- 
server.listen(8080)

server.context.a = 12  // 一般用于定义去全局变量

let router = new Router()

// ----------------------------
ctx.throw(状态码, 错误信息)
router.get('/login' async ctx=>{
	ctx.throw(400, 'use passwoed is required')
})


ctx.assert 断言测试
ctx.assert(条件,状态码,描述信息)
router.get('/login' async ctx=>{
	ctx.assert(ctx.query.use, 400, 'use is required')
	ctx.assert(ctx.query.password, 400, 'password is required')
})


ctx.state = 305
router.get('/cartoon' async ctx=>{
	ctx.state = 404
})

ctx.redirect() // 重定向成功跳转
router.get('/login' async ctx=>{
	ctx.redirect('/mews')
})

ctx.attchment()
router.get('/login' async ctx=>{
	ctx.attchment('/a.txt') // 文件路径
})



// ----------------------------
// koa-static
let staticRouter= new Router() // 静态路由

staticRouter.all(/(\.png | \.jpg | \.gif)$/i, {
	maxage: 1000*86400*60
})


staticRouter.all(/(\.css | \.scss | \.less)$/i, {
	maxage: 1000*86400*1
})

// ----------------------------
// koa-better-body
1.上传文件
server.use(body,({
	uploadDir: './static/upload'  //上传文件存放的路径
}))

server.use(async ctx=>{
	cosnole.log(ctx.request.fields)
})
// ----------------------------
// cookie

server.use(async ctx=>{
	ctx.cookie.set('user', 'pps', {
		maxage: 1000*86400*1, // 过期时间
		signed: true // 签名
	}) 
	// 设置 cookie 
	ctx.cookie.get('user') 
	// 获取cookie
})
// ----------------------------
// session  koa-session
server.keys = ['asdasda','21123123','2saawsw23f']
server.use(session,({
	maxAge:20*60*1000,
	renew: true// 自动续期
}, server))

server.use(async ctx=>{
 if(!.session['view']){
	.session['view'] = 0
  }else{
	.session['view']++
	ctx.body = `这是第${ctx.session.view}访问`
 }
})
// ----------------------------
// 连接 mysql
let conn = mysql.createPool({
	host:'localhost',
	user:'root',
	password: '',
	database: ''
})

let db = co(conn)

server.context.db = db

server.use(async ctx=>{
	let data = await db.query(`SELECT * FROM item_table`)
	ctx.body = data
})

// ----------------------------
// const fs = require('await-fs') // koa 读取文件使用
	
// ----------------------------
// koa 接受数据 完成post提交
	const {title, name, age } = ctx.request.files //获得参数
	// add

	ctx.db.query('INSERT INTO class_tab (title, name, age) VALUES(?,?,?)',[title, name, age])
	router.post('/banner',async ctx=>{
		const {title, name, age} = ctx.request.files
		await ctx.db.query('INSERT INFO class_tab (title, name, age) VALUES (?,?,?)', [title, name, age])
		ctx.redirect('/admin')
	})

	// del 
	router.get('/banner/del/:id', async ctx=>{
		const {id} = ctx.parmas
		let data = await ctx.db.query(`SELECT * FROM WHERE id=${id}`)
		let {filename} = data.json()
		unlinkFn(`../../updata/${filename}`)
		ctx.db.query('DELETE class_tab WHERE id=?',[id])
		ctx.db.redirect('./admin')
	})

	// update
	// UPDATE class_tab SET title="xx", WHERE id='1'
	router.get('/banner/mod/:id/', async ctx=>{
		let {id} = ctx.parmas
		let data = ctx.db.query('SELECT * FROM class_tab WHERE id=?',[id])
		ctx.assert(data.length<0, 400, 'no data') 
	})



	function unlinkFn(path){
		return new Promise((resolve,reject)=>{
			fs.unlink(path,(err)=>{
				if(err){
					reject(err)
				}else{
					resolve()
				}
			})
		})
	}














server.use(router.Routes())
server.use(staticRouter.Routes())









// webpack 配置多入口
webpack.config.js
module.exports = {
	mode: 'development',
	evtry:{
		index: './src/main1.js',
		admin: './src/main2.js'
	},
	output:{
		path: path.resolve(__dirname, 'boundle'),
		filename: [name].min.js
	}
}


// 创建使用gulp
 npm i gulp -g
新建gulpfile.js文件

1.压缩js文件 gulp-uglify


const gulp = require('gulp')
const uglify = require('gulp-uglify')
gulp.task('uglify', ()=>{
	return gulp.src(['./src/js/*.js']) 					// 获取要执行的文件
				 .pipe(uglify())  										// 执行功能
				 .pipe(gulp.dest('../../static/js')) 	// 输出到指定目录
})


gulp.task('default', ['uglify'])




表连接

1.通过一个ID进行连接
2.修饰符
  LEFT JOIN 左连接   RIGHT JOIN 右连接
  AS 修改名字  title AS title1


表连接
SELECT
*,
article.ID AS article_ID,
article.title AS article_title,
catalog.title AS catalog_title
FROM　article_tab 
LEFT JOIN catalog_tab ON article_tab.catalog_ID = catalog_tab.ID
ORDER BY article_tab created_time ASC LIMIT 10




搜索语句

SELECT * FROM class_tab WHERE LIKE title="%a%"  搜索带a的数据  

%%为修饰符   %a 以a开头的数据    a%以a为结尾的数据   %a%  中间含有a的数据

