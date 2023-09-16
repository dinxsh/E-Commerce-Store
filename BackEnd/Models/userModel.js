const Mongoose = require('mongoose')
const { reset } = require('nodemon')
const validator = require('validator')


const userModel = new Mongoose.Schema({
    name:{
        required:[true,"Please Enter your name"],
        maxLength:[32,"Name cannot be more than 32 chars"],
        minLength:[3,"Name cannot be less than 3 chars"]
    },
    email:{
        required:[true,"Please Enter your Email"],
        maxLength:[32,"email cannot be more than 32 chars"],
        minLength:[3,"email cannot be less than 3 chars"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        required:[true,"Please Enter your Password"],
        maxLength:[32,"Password cannot be more than 32 chars"],
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = userModel