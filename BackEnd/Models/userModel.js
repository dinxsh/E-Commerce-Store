const Mongoose = require('mongoose')
const { reset } = require('nodemon')
const validator = require('validator')
const crypto = require('crypto')

const userModel = new Mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[32,"Name cannot be more than 32 chars"],
        minLength:[3,"Name cannot be less than 3 chars"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        maxLength:[32,"email cannot be more than 32 chars"],
        minLength:[3,"email cannot be less than 3 chars"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        maxLength:[64,"Password cannot be more than 32 chars"],
        minLength:[3,"Password cannot be less than 3 chars"],
        select:"false"
    },
    avatar: [{
            public_id: {
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }], 
        role:{
            type:String,
            default:"user"
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userModel.methods.getPasswordToken = function(){    //forgot password functionality
    const resetPassword = crypto.randomBytes(20).toString("hex")
    
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassword)
    .digest("hex")
    this.resetPasswordExpire  = Date.now() + 15 * 60 * 1000
    return resetPassword;
}


module.exports = Mongoose.model("User",userModel)