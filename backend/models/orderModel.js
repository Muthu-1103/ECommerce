const mongoose=require('mongoose')
const order=new mongoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,
    createdAt:Date
})
const orderDetail=mongoose.model('Order',order)
module.exports=orderDetail