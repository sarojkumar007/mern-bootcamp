const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { updateStock } = require('../controllers/product')
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus } = require('../controllers/order')

// Params
router.param('uid', getUserById)
router.param('orderId', getOrderById)
// Routes

router.post('/create/:uid', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock,createOrder)

router.get('/all/:uid', isSignedIn, isAuthenticated, isAdmin, getAllOrders)
router.get('/status/:uid', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

router.put('/:orderId/update/:uid', isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)

module.exports = router;