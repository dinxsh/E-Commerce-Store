const jwt = require('jsonwebtoken');
const user = require('../Models/userModel');


const isAuthenticated =  async(req,res,next)=> {
    const {token} = req.cookies; 
    if(!token){
        return res.json({
            sucess:false,
            message:"Please login to access this resource"
        })
    }
    const Decode = jwt.verify(token,process.env.JWT_KEY)
    req.user = await user.findById(Decode.id) 
    next(); 
}

const admin = (...roles)=>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            res.json({
                sucess:false,
                message:`Role: ${req.user.role} is not allowed to access this resource`
            })
        } else {
            next();
        }
    } 
}

module.exports = {isAuthenticated,admin}