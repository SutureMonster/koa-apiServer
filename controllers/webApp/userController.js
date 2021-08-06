const userModel = require('../../models/userModel')
const jwt=require('../../utils/jwt.js')

class UserController {
	//获取用户列表
  static async getUserList(ctx) {
    let list = await userModel.find({})
    ctx.body = {
      err: 0,
      msg: 'success',
      data: { list }
    }
  }
  
  //用户登录
  static async login(ctx){
	  let {username,password}=ctx.request.body
	  const user=await userModel.findOne({username,password})
	  if(user){
		  const token=jwt.createToken(user)
		  ctx.body={err:0,msg:'登录成功',data:{token}}
	  }else{
		  ctx.body={err:1,msg:'用户名或密码有误',data:{}}
	  }
  }
  
  //用户注册
  static async regist(ctx){
	  console.log(ctx.request.body);
	 let {username, password}=ctx.request.body
	 const user=await userModel.findOne({username})
	 if(user){
		 return ctx.body={err:1,msg:'用户名已存在'}
	 }
	 await userModel.insertMany([{username,password}])
	 ctx.body=ctx.body={err:0,msg:'注册成功',data:{}}
  }
}

module.exports = UserController
