const cartModel = require('../../models/cartModel')
const goodModel = require('../../models/cgoodModel')

class CartController {
	//添加购物车
	static async addToCart(ctx){
		let {good_id,num}=ctx.request.body
		console.log(ctx);
		const user=ctx.user
		const ele={
			user_id:user._id,
			good_id,
			num:num||1
		}
		const doc=await cartModel.findOne({user_id:user._id,good_id,status:1})
		if(doc){
			await cartModel.updateOne({user_id:user._id,good_id},{num:doc.num+num})
		}else{
			await cartModel.insertMany([ele])
		}
		ctx.body={err:0,msg:'success',data:{info:ele}}
	}
	
	static async getCartList(ctx){
		const user=ctx.user
		const list=await cartModel.find({status:1,user_id:user._id})
		const newList=JSON.parse(JSON.stringify(list))
		for(let i=0;i<newList.length;i++){
			newList[i]['good_info']=await goodModel.findOne({_id:newList[i].good_id})
		}
		ctx.body={err:0,msg:'success',data:{list:newList}}
	}
	
	static async delCartItem(ctx) {
	    let { cart_id } = ctx.request.query
	    await cartModel.updateOne({_id: cart_id}, { status: 0 })
	    ctx.body = { err: 0, msg: 'success', data: {} }
	  }
	
	  static async updCartCount(ctx) {
	    let { cart_id, new_num } = ctx.request.query
	    await cartModel.updateOne({_id: cart_id}, {num: new_num})
	    ctx.body = { err: 0, msg: 'success', data: {} }
	  }
	
	  static async submitCart(ctx) {
	    let { ids } = ctx.request.body
	    const arr = ids.split(';').filter(ele=>ele)
	    for(let i=0; i<arr.length; i++) {
	      await cartModel.updateOne({_id: arr[i]}, { status: 0 })
	    }
	    // 生成一张订单
	    ctx.body = { err: 0, msg: 'success', data: {} }
	  }
}

module.exports = CartController
