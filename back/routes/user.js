const express = require('express')
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')

router.param('uid', getUserById)

router.get('/:uid', isSignedIn, isAuthenticated, getUser)

router.put('/:uid/update', isSignedIn, isAuthenticated, updateUser)

router.get('/:uid/orders', isSignedIn, isAuthenticated, userPurchaseList)

module.exports = router;