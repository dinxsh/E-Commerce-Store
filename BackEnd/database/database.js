const Mongoose = require('mongoose')

const connectDB = () => {   
    Mongoose.connect("mongodb://127.0.0.1:27017/ECommerce").then(()=>{
        console.log("Database has been created")
    })
    
}


module.exports = connectDB
