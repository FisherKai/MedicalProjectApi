const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const koajwt = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');

const index = require('./routes/index')
const users = require('./routes/users')
const { SECRET } = require('./config/config')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 允许跨域
app.use(cors())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start;
  let data = `host:${ctx.header.host} method:${ctx.method} url:${ctx.url} UA:${ctx.header['user-agent']} 访问日期:${new Date().toLocaleString()} 响应时间:${ms}ms` + '\n';
  fs.appendFile(path.resolve(__dirname, './logs/access.log'), data, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
})
// 排除哪些接口不需要验证
app.use(koajwt({
  secret: SECRET
}).unless({
  path: [
    /\/user\/login/,
    /\/user\/register/]
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  fs.appendFile(path.resolve(__dirname, './logs/server_error.log'), err, (e) => { });
  console.error('server error', err, ctx)
});

module.exports = app
