const goodModel = require('../../models/goodModel')
const cateModel =require('../../models/catemodel.js')
const cgoodModel =require('../../models/cgoodModel.js')

class GoodController {
  static async getGoodList(ctx) {
	// let { hot, cate, name, min_price, max_price } = ctx.request.query
    let { page, size } = ctx.request.query
	size = parseInt(size || 10)
	page = parseInt(page || 1)
	
	const total = await goodModel.find({}).count()
	const list = await goodModel.find({}).limit(size).skip((page-1)*size)
	ctx.body = { err: 0, msg:'success' ,data: {total, list}}
  }
  
  static async getCgoodList(ctx){
	  let {size,page}=ctx.request.query
	  size=parseInt(size||10)
	  page=parseInt(page||1)
	  const ctotal = await cgoodModel.find({}).count()
	  const clist = await cgoodModel.find({}).limit(size).skip((page-1)*size)
	  ctx.body = { err: 0, msg:'success' ,data: {ctotal, clist}}
  }
  
    static async getCgoodInfo(ctx) {
  	  let { id } = ctx.request.query
  	  if(!id) return ctx.body = { err: 1, msg:'id是必填入参', data: {} }
  	  const info = await cgoodModel.findOne({_id: id})
  	  // 商家信息查询
  	  // 商品评论查询
  	  ctx.body = { err: 0, msg: 'success', data: { info }}
    }
  
  static async getAllCates(ctx){
	  let list=await cateModel.find({"level":1}).limit(15)
	  ctx.body={err:0,msg:'success',data:{list}}
  }
}

module.exports = GoodController