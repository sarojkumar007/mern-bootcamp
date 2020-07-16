const express = require('express')
const router = express.Router()

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')


router.get('/all', getAllCategory)

router.param('uid', getUserById)
router.param('categoryId', getCategoryById)

router.post('/create/:uid', isSignedIn, isAuthenticated, isAdmin, createCategory)
router.get('/:categoryId', getCategory)

router.put('/:categoryId/update/:uid', isSignedIn, isAuthenticated, isAdmin, updateCategory)

router.delete('/:categoryId/del/:uid', isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router