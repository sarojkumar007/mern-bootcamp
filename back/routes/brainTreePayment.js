const express = require('express')
const router = express.Router()

const { getUserById } = require('../controllers/user')
const { isSignedIn, isAuthenticated } = require('../controllers/auth')
const { getToken, processPay } = require('../controllers/brainTreePayment')

router.param('uid', getUserById)

router.get('/gettoken/:uid', isSignedIn, isAuthenticated, getToken);
router.post('/pay/:uid', isSignedIn, isAuthenticated, processPay);


module.exports = router;