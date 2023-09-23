const Order = require('../Models/orderSchema.js')
const Product = require('../Models/productModel.js')

const newOrder = async (req, res) => {

    const { shippingInfo, orderItems, paymentInfo,
        paidAt, itemsprice, taxPrice, Shippingprice, Totalprice,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt,
        itemsprice,
        taxPrice,
        Shippingprice,
        Totalprice,
        user: req.user._id,
        paidAt: Date.now()
    })

    res.status(201).json({
        sucess: true,
        order
    })
}

//get single Order

const getSingleOrder = async(req,res)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(!order){
        return res.json({
            sucess:false,
            message:"Order ID not found"
        })
    }    
    res.status(201).json({
        sucess:true,
        order
    })
    
}

//shows all user orders 
const MyOrders = async(req,res)=>{
    const order = await Order.find({user:req.user._id})  
    
    res.status(201).json({
        sucess:true,
        order
    })
}
 //shows all order -- admin   
const AllOrders = async(req,res)=>{
    const order = await Order.find()  
    let TotalRevenue = 0;   //to get total revenue generated to admin

    order.forEach(order=>{
        TotalRevenue+= order.Totalprice
    })

    res.status(201).json({
        sucess:true,
        order
    })
}

const updateOrder = async (req,res)=>{
    const order = await Order.findById(req.params.id)  
        if(!order){
        return res.json({
            sucess:false,
            message:"Order ID not found" 
        }) 
    }   
    if(order.orderStatus === "Delivered"){
        return res.json({mess:"You have already delivered this order"})
    }
    
    order.orderItems.forEach(async(item)=>{
        await UpdateStock(item.product,item.quantity)
    })
    
    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){ 
        order.deliveredAt = Date.now() 
    }
    await order.save({validateBeforeSave:false})
    res.status(201).json({
        sucess:true,
        order
    })
}

const UpdateStock = async(id,quantity)=>{
    const product = await Product.findById(id)
    product.Stock -= quantity
    console.log(product.Stock)
    await product.save({validateBeforeSave:false})
}

//delete orders
const DelOrders = async(req,res)=>{
    const order = await Order.findById(req.params.id)  
    await order.deleteOne()
    if(!order){
        return res.json({
            sucess:false,
            message:"Order ID not found" 
        }) 
    }  
    res.status(201).json({
        sucess:true,
        message:"Deleted Successfully"
    })
} 


module.exports = { newOrder ,getSingleOrder,MyOrders,MyOrders,AllOrders,updateOrder,DelOrders} 