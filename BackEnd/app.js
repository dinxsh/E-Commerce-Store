const express = require('express');
const app = express()
app.use(express.json())
const connectingDB = require('./database/database.js')

connectingDB()

//Router imports
const product = require('./routes/products.js')

app.use("/",product);

module.exports= {app}