const Router =require('@koa/router')

const checkToken=require('../middelwares/checkToken')

const router=new Router();



const v = '/api/v1'

const Good = require('../controllers/webApp/goodController')
const User = require('../controllers/webApp/userController')
const Cart = require('../controllers/webApp/cartController')

router
.get(`${v}/getUserList`, User.getUserList)
.get(`${v}/getGoodList`, Good.getGoodList)
.get(`${v}/getCgoodList`, Good.getCgoodList)
.get(`${v}/getAllCates`, Good.getAllCates)
.get(`${v}/getCgoodInfo`, Good.getCgoodInfo)
.post(`${v}/user/login`, User.login)
.post(`${v}/user/regist`, User.regist)
.post(`${v}/cart/add`,checkToken, Cart.addToCart)
.get(`${v}/cart/list`, checkToken, Cart.getCartList)
.get(`${v}/cart/del`, checkToken, Cart.delCartItem)
.get(`${v}/cart/upd`, checkToken, Cart.updCartCount)
.post(`${v}/cart/submit`, checkToken, Cart.submitCart)

module.exports=router;