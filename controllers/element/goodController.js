const cgoodModel =require('../../models/cgoodModel')
const cateModel =require('../../models/catemodel.js')
const fs = require('fs')
const path = require('path')
// const jwt=require('../../utils/jwt.js')

class GoodController {

	static async getGoodList(ctx){
		let { name, cate, page, size, min_price, max_price } = ctx.request.query
		size=parseInt(size||10)
		page=parseInt(page||1)
		const total = await cgoodModel.find({}).count()
		const list = await cgoodModel.find({}).limit(size).skip((page-1)*size).sort({create_time:-1,readnum:-1})
		ctx.body = { err:0, msg:'success' ,data: {total, list}}
	}

	static async getAllCates(ctx){
	  let list=await cateModel.find({"level":1})
	  ctx.body={err:0,msg:'success',data:{list}}
	}

  static async getGoodInfo(ctx){
  	let {_id} = ctx.request.query
  	const info =await cgoodModel.findOne({_id:_id})
  	ctx.body={err:0,msg:'success',data:{info}}
  }

  static async uploadImg(ctx){
  	const file = ctx.request.files.good
  	const readStream = fs.createReadStream(file.path)
  	const filePath = `/cdn/${Date.now()}_${file.name}`
  	const writeStream = fs.createWriteStream(path.resolve(__dirname,`../../public${filePath}`))
  	await readStream.pipe(writeStream)
  	ctx.body={err:0,msg:'success',data:{img:filePath}}
  }

  static async updateGood(ctx){
  	 let { name, description, cimg, price, cate, is_promote,stock, id } = ctx.request.body
  	 const ele={
  	 	name,
  	 	description,
  	 	price,
  	 	cate,
  	 	cimg:cimg||'',
  	 	is_promote:is_promote||false,
  	 }
  	 let info=null
  	 if(id){
  	 	info=await cgoodModel.updateOne({_id:id},ele)
  	 }else{
  	 	info=await cgoodModel.insertMany([ele])
  	 }
  	 ctx.body={err:0,msg:'success',data:{info}}
  }

  static async DelGood(ctx){
  	const {id} =ctx.request.query
  	console.log(id)
  	await cgoodModel.deleteOne({_id:id})
  	ctx.body={err:0,msg:'success',data:{}}
  }

}

module.exports = GoodController