const Koa = require('koa')
const path = require('path')
const app =new Koa()

require('./utils/connection')

app.use(require('koa-static')(path.join(__dirname,'public')))

app.use(require('koa-body')({multipart:true}))

app.use(require('./routers/webApp.js').routes())
app.use(require('./routers/element.js').routes())



app.listen(9999,()=>console.log('server in runing on 9999'))