const jwt = require('jsonwebtoken')

const sendCookie_Token = (user,status,res)=>{
    const token = jwt.sign({id:user._id},process.env.JWT_KEY,{          //creating a token
        expiresIn:process.env.JWT_EXPIRE,
    })
    const options = {
            httpOnly:true,
            expires: new Date(Date.now() * 50)      
    } 

    res.status(status).cookie('token',token,options).json({
        sucess:true,
        user
    })
}

module.exports = sendCookie_Token  