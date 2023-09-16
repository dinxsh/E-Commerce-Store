const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product's Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    price :{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    images:[{
        public_id: {
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    Stock:{
        type:Number,
        required:[true,"Please Enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 char"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Product",productSchema)