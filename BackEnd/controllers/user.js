const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const sendCookie_Token = require('../utils/jwtToken');
const sendEmail  = require('../utils/sendEmail.js')
const crypto = require('crypto')

const Register = async (req,res)=>{
    const {name,email,password} = req.body
    const existinguser = await User.findOne({email})
    if(existinguser){
        return res.status(400).json({ error: 'User already exist' });
    }
    const HashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:HashedPassword,
        avatar:{
            public_id:"This is a sample id",
            url:"this is a sample url "
        }
    });
    sendCookie_Token(user,201,res)
}; 

const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.json({
            sucess:false,
            message:"Please provide email"
        })
    }
    if(!password){
        return res.json({
            sucess:false,
            message:"Please provide password"
        })
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return res.json({
            sucess:false,
            message:"User doesn't exist"
        })
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
        return res.json({
            sucess:false,
            message:"Password do not match"
        })
    } 
    sendCookie_Token(user,201,res)
}

const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now())
    }).json({
        sucess:true,
        message:"Logged Out successfully"
    })
}

const ForgotPassword = async (req,res,)=>{
    const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.json({
                sucess:false,
                message:"User doesn't exist"
            })
        }
        const resetToken = user.getPasswordToken()    //accessing url token
        await user.save({validateBeforeSave:true})
        const resetPasswordURL = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

      const message = `Your Password Reset Token is ${resetPasswordURL} \n \n if you have not requested
      this, please ignore it`
      try {
        await sendEmail({
            email:user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            sucess:true,
            Message:`Email has been sent to ${user.email} sucessfully `
        })
      } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:true})
      }
}

const resetPassword = async(req,res)=>{
    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    })
    console.log(user)
    if(!user){
        return res.json({
            sucess:false,
            message:"Reset Password Token invalid or has been expired"
        })
    }

    if(req.body.password !== req.body.confirmpassword){
        return res.json({
            sucess:false,
            message:"Password does not match "
        })
    }
    const newPasswordHash = await bcrypt.hash(req.body.password, 10);
    user.password = newPasswordHash;
    user.resetPasswordToken = undefined,
    user.resetPasswordExpire= undefined,
    console.log(user , "before")
    await user.save(); 
    console.log(user,"after")
    sendCookie_Token(user,201,res)
}
//gets user details
const getUserDetails = async(req,res) =>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        sucess:true,
        user
    })

}
const updateUserDetails = async(req,res) =>{
    const user = await User.findById(req.user.id)
    const isPasswordMatched = await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordMatched){
        return res.json({
            sucess:false,
            message:"Old Password does not match"
        })
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return res.json({
            sucess:false,
            message:"Password does not match"
        }) 
    }
    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
    user.password = newPasswordHash;
    await user.save()
    
    res.status(200).json({
        sucess:true,
        user
    })

}

const updateProfile = async(req,res)=>{
    const newUserData = {
       name: req.body.name, email: req.body.email
    }
    await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidator:true,
        useFindAndModify: false
    });
    res.json({
        sucess:true,
        message:"User Profile has been updated"
    });
}

// ADMIN ROUTES

//gives you information of all users.
const getAllusers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json({
        sucess:true,
        users
    })
}

// Get info of any specific user (admin)
const getUser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.json({
            sucess:false,
            message:"User not Found"
        })
    }
    res.status(200).json({
        sucess:true,
        user
    })
}

 const DeleteProfile = async(req,res)=>{
  const user =  await User.findById(req.params.id)
    if(!user){
        return res.json({
            sucess:false,
            message:"User does not exist"
        })
    }
    await user.deleteOne();
    res.json({
        success:true,
        message:"User has been deleted successfully"
    })

 }

 //to change roles of a user, (admin exclusive)

 const updateRole = async(req,res)=>{
    const newUserData = {
       name: req.body.name, email: req.body.email , role:req.body.role
    }
    await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidator:true,
        useFindAndModify: false
    });
    res.json({
        sucess:true,
        message:"User Profile has been updated"
    });
}



module.exports = {Register,login,logout,ForgotPassword ,resetPassword,getUserDetails,
    updateUserDetails,updateProfile,getAllusers,getUser ,DeleteProfile,updateRole

}