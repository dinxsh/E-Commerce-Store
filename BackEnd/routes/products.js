const express = require('express')
const { getAllProducts ,createProduct,updateProduct,DeleteProduct,getProduct, Review, getAllReviews, DeleteReview} = require('../controllers/products');
const {isAuthenticated,admin} = require('../middlewares/auth');
const router = express.Router()

//fetches all the products
router.get('/products',getAllProducts)

//adds products in the database
router.post('/addProducts',isAuthenticated,admin("admin"),createProduct)

router.route("/product/:id")
.put(isAuthenticated,admin("admin"),updateProduct)
.delete(isAuthenticated,admin("admin"),DeleteProduct)
.get(getProduct) 
 
router.route("/review").put(isAuthenticated,Review) 

router.route("/reviews").get(getAllReviews).delete(isAuthenticated,DeleteReview)

module.exports = router