const mongoose = require('mongoose')

module.exports =  mongoose.model('cates', mongoose.Schema({
  id: Number,
  name: String,
  level:Number
}))
