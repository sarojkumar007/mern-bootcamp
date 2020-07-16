const express = require('express')
const router = express.Router()

const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')


router.get('/all', getAllProducts)

// What to do when this param is called
router.param("uid", getUserById)
router.param("pId", getProductById)

// routes
router.post('/create/:uid', isSignedIn, isAuthenticated, isAdmin, createProduct)
router.get('/:pId', getProduct)
router.get('/:pId/photo', photo)

router.delete('/:pId/del/:uid', isSignedIn, isAuthenticated, isAdmin, deleteProduct)

router.put('/:pId/update/:uid', isSignedIn, isAuthenticated, isAdmin, updateProduct)

router.get('/categories', getAllUniqueCategories)

module.exports = router