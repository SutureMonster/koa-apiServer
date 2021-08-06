const jwt = require('jsonwebtoken')

function createToken(user){
	return jwt.sign({
		data:user,
		iat:Math.floor(Date.now()/1000) + 3600*24*7
	},
	'cj')
}

// 解析token
function verifyToken(ctx) {
  return new Promise((resolve, reject)=>{
    const token = ctx.headers.authorization
    try {
      // 如果token反解析成功
      var decoded = jwt.verify(token, 'cj')
      console.log('--decoded', decoded)
      resolve(decoded.data)  // .then()
    } catch(err) {
      console.log('err', err)
      // reject(err)  // .catch()

    }
  })
}
module.exports={
	createToken,
	verifyToken
}