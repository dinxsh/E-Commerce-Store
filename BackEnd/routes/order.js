const express = require('express')
const {newOrder, getSingleOrder, MyOrders, AllOrders, updateOrder, DelOrders} = require('../controllers/order.js')
const {isAuthenticated ,admin} = require('../middlewares/auth.js')
const router = express.Router()

router.get('/createOrder', isAuthenticated, newOrder)
router.get('/getOrder/:id', isAuthenticated,getSingleOrder)
router.get('/myOrders', isAuthenticated,MyOrders)
router.get('/AllOrders',isAuthenticated,admin("admin"),AllOrders)
router.put('/updateOrder/:id',isAuthenticated,admin("admin"),updateOrder)
router.delete('/DeleteOrder/:id',isAuthenticated,admin("admin"),DelOrders)


module.exports = router