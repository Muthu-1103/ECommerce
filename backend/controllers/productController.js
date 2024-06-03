const products=require('../models/productModel')
exports.getProduct=async (req,res,next)=>{
    let search=req.query.keyword?{name:{$regex:req.query.keyword,$options:'i'}}:{}
    const prods= await products.find(search);
    res.json({
        success:true,
        prods
    })
}
exports.getSingleProduct=async (req,res,next)=>{
    try {
        const singleProd=await products.findById(req.params.id);
    res.json({
        success:true,
        singleProd
    })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Not Found"
        })
    }
    
}
