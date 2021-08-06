const Router =require('@koa/router')
const router=new Router();

const checkToken=require('../middelwares/checkToken')
const User = require('../controllers/element/userController')
const Good = require('../controllers/element/goodController')
const v = '/api/v1/element'

router
.post(`${v}/login`, User.login)
.get(`${v}/userinfo`,checkToken,User.getUserInfo)
.get(`${v}/good/list`,checkToken,Good.getGoodList)
.get(`${v}/good/cate`,checkToken,Good.getAllCates)
.get(`${v}/good/info`,checkToken,Good.getGoodInfo)
.post(`${v}/upload/img`,checkToken,Good.uploadImg)
.post(`${v}/update/good`,checkToken,Good.updateGood)
.get(`${v}/good/del`,checkToken,Good.DelGood)


module.exports=router;