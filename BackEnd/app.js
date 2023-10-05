const express = require('express');
const cookie = require('cookie-parser')
const app = express()
const cors = require('cors')
 const bodyparser = require('body-parser')
 const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(cookie())
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload())

const connectingDB = require('./database/database.js') 

connectingDB() 
//Router imports
const product = require('./routes/products.js')
const user = require('./routes/user.js')
const order = require('./routes/order.js') 

app.use("/",product);
app.use('/',user)
app.use('/',order)

module.exports= {app}