const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/ApiFeatures.js");


//Create Product--Admin
const createProduct =  async (req,res,next) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            sucess:"true",
            product
        })
    } catch (error) {
        console.log(error.message)
    }
}
//Fetch product details
const getProduct = async(req,res)=>{
    const data = await Product.findById(req.params.id)
    if(!data){
        return res.status(500).json({
            sucess:false,
            Message: "product not found"
        })
    }
    res.status(200).json({
        sucess:"true",
        data
    })
}

// get all products + also search feature
const getAllProducts = async (req, res) => {
    const resultsPerPage = 2;
    const keyword = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const data = await keyword.query;
    res.status(200).json({
        sucess: true,
        data
    })
}

//updating products 
const updateProduct = async (req,res) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            Message: "product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindandModify:true}
    )

    res.status(200).json({
        sucess:true,
        product
    })
}

//Deleting Products
const DeleteProduct = async(req,res)=>{
    const Data = await Product.findById(req.params.id)
    Data.deleteOne()

    if(!Data){
        return res.status(500).json({
            sucess:false,
            message:"Product Not Found"
        })
    }

    res.status(200).json({
        sucess:true,
        Message:"User has been deleted"
    })
}

module.exports = {getAllProducts,createProduct,updateProduct,DeleteProduct,getProduct}