const mongoose = require('mongoose')
const schema = mongoose.Schema
const Product = require('./product.model')
const User = require('./user.model')

const cartSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:User,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
   products:[
        {
            productId:{
                type:schema.Types.ObjectId,
                ref:Product,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
   ]
})

module.exports =mongoose.model('cart',cartSchema)
