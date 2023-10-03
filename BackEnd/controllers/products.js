const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/ApiFeatures.js");


//Create Product--Admin
const createProduct =  async (req,res,next) => {
    try {
        req.body.user = req.user.id
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
    const resultsPerPage = 6;
    const productCount = await Product.countDocuments();
    const keyword = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const data = await keyword.query;
    res.status(200).json({
        sucess: true,
        data,
        productCount,
        resultsPerPage
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

//create New Review or Update the review
const Review = async(req,res)=>{
    const {rating,comment,productID} = req.body
    const review ={ 
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product = await Product.findById(productID)
    
    const existingReviewIndex = product.reviews.findIndex(
        (data) => data.user._id.toString() === req.user._id.toString()
      );
    if (existingReviewIndex !== -1) {
        product.reviews[existingReviewIndex] = review;
    }
    else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }
    let avg = 0;
    
    product.reviews.forEach(rev=>{    //calcuating rating of the rating of the product
        avg+=rev.rating 
    })

    product.ratings = avg/product.reviews.length

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        sucess:true,
        message:"updated sucessfully"
    })
}

const getAllReviews = async(req,res)=>{
    const product = await Product.findById(req.query.id)
    if(!product){
        return res.json({
            sucess:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        sucess:true,
        review:product.reviews 
    })
}


const DeleteReview = async(req,res)=>{
    const product = await Product.findById(req.query.productID)
    if(!product){
        return res.json({
            sucess:false,
            message:"Product not found"
        })
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    
    reviews.forEach(rev=>{    //calcuating rating of the rating of the product
        avg+=rev.rating 
    })

    const ratings = avg/reviews.length
    const numofReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productID,{
        reviews,
        ratings,
        numofReviews
    },{
        new:true,
        runValidators:true,
        useFindandModify : false
    })

    res.status(200).json({
        sucess:true,
        Message:"Done successfully"
    })
}

module.exports = {getAllProducts,createProduct,updateProduct,DeleteProduct
                 ,getProduct,Review,getAllReviews,DeleteReview} 