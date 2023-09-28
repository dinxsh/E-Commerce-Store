const { config } = require('dotenv')
const {app} = require('./app')

// HANDLING uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    process.exit(1)
})

config({path:'./ok.env'}) 


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server has started on PORT ${process.env.PORT}`)
})

// Unhandled Promise Rejections
process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    server.close(()=>{
        process.exit(1);
    });
})