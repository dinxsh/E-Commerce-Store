const express = require('express')
const { getAllProducts ,createProduct,updateProduct,DeleteProduct,getProduct} = require('../controllers/products')
const router = express.Router()

//fetches all the products
router.get('/products',getAllProducts)

//adds products in the database
router.post('/addProducts',createProduct)

router.route("/product/:id")
.put(updateProduct)
.delete(DeleteProduct)
.get(getProduct)


module.exports = router