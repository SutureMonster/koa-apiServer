const mongoose =require('mongoose')

module.exports = mongoose.model('cgoods',mongoose.Schema({
  // id:Number,
  name: String,
  price: Number,
  stock:{type:Number,default:0},
  weight:{type:Number,default:0},
  img:{type:String,default:''},
  cimg:{type:String,default:''},
  cate:String,
  create_time: { type: Number, default: Date.now() },
  introduce:{type:String,default:''},
  readnum:{type:Number,default:0},
  is_promote: {type:Boolean,default:false},
  description:String,
  manyImg: {type:String,default:''},
}))