const express = require('express')
const router = express.Router()

const { makePayment } = require('../controllers/stripePayment')

router.post('/pay', makePayment)

module.exports = router;