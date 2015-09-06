/*==================================================
 入口

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var koa = require('koa')
var app = koa()
var path = require('path')
var http = require("http")
var redis = require('koa-redis')
var fs = require('fs')

// 计算响应时间
app.use(function* (next) {
    var start = new Date()

    yield next

    var ms = new Date() - start
    console.log(ms + 'ms')
});

// 计划任务
require('./lib/regularTask')

// 加载配置文件
var conf = require(path.join(__dirname,
    'config', 'config.js'))

app.name = conf.appName

app.keys = [conf.appKeys.key, conf.appKeys.value]

// 连接数据库


// 设置session
/*
var session = require('koa-generic-session')
app.use(session({
	store: redis()
}))
*/

// 开放静态文件目录
var staticServe = require('koa-static')
app.use(staticServe(path.join(__dirname, conf.staticDir.path)), {
    maxage: conf.staticDir.maxAge
})

// 设置静态资源缓存
// 处理public目录下的js, css, jpg, png , ttf, woff， eot, otf, svg文件
var staticCache = require('koa-static-cache')

app.use(staticCache(path.join(__dirname, conf.staticDir.path), {
    maxAge: conf.staticDir.maxAge
}))

// 设置etag
var conditional = require('koa-conditional-get')
var etag = require('koa-etag')

app.use(conditional())
app.use(etag())

// 获取post传参（req.body）
var bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 路由
var router = require('./config/router.js')
app.use(router.routes())
app.use(router.allowedMethods())

// 监听错误
app.on("error", function (err, ctx) {
    log.error('server error', err, ctx)
})

// 捕获未捕获的错误
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err)

    //打印出错误的调用栈方便调试
    console.log(err.stack)
});

// 统一模版
var templateHtml = fs.readFileSync(conf.templatePath, "utf-8")
app.use(function* () {
    this.body = templateHtml
})

app.listen(conf.port)

console.log("service is running!")
