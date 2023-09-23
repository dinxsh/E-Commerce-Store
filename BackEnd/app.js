const express = require('express');
const cookie = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookie())

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