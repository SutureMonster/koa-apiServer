const userModel = require('../../models/userModel')
const jwt=require('../../utils/jwt.js')

class UserController {

  //用户登录
  static async login(ctx){
  	// console.log(111,ctx.request.body)
	const {username,password}=ctx.request.body 
	const user=await userModel.findOne({username,password})
	// console.log(username,password)
	if(user){
		const token=jwt.createToken(user)
		ctx.body={err:0,msg:'登录成功',data:{token}}
	} else{
		ctx.body={err:-1,msg:'用户名或密码不匹配',data:{}}
	} 
  }

  static async getUserInfo(ctx){
  	// const {token}=ctx.request.body
  	// console.log(1111111)
  	const user=ctx.user
  	// console.log(ctx.user)
  	const info=await userModel.findOne({username:user.username})
  	// console.log(info)
  	
  	const roles=info.role.split(';').filter(e=>e)
  	ctx.body={err:0,msg: 'success', data: {
        name: 'GP6',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: '18K保底冲20K',
        roles
      }
  	}

  }
  
}


module.exports = UserController
