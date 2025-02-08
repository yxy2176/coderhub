const KoaRouter = require('@koa/router')

const userRouter = new KoaRouter({ prefix: '/user' })

module.exports = userRouter