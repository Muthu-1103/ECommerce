const orderDetail=require('../models/orderModel')
const prodDetail = require('../models/productModel')
exports.createOrder=async (req,res,next)=>{
    const {cartItems}=req.body;
    const amount=Number(cartItems.reduce((acc,item)=>(acc+item.product.price*item.qty),0)).toFixed(2);
    const status='pending';
    const order=await orderDetail.create({cartItems,amount,status})
    //Updating Stock
    for(const item of cartItems){
        const product=await prodDetail.findById(item.product._id)
        if(product){
            product.stock=product.stock-item.qty
            await product.save();
        }
        else{
            return res.status(400).json({success:false,message:'Error'})
        }
    }
    res.json({
        success:true,
        order 
    })
}