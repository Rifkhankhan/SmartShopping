const express = require('express')
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts
} = require('./../Controllers/productController')
const { protect, admin } = require('../Middleware/authMiddlewate')

const router = express.Router()

router.get('/', getProducts)
router.get('/top', getTopProducts)
router.post('/', protect, admin, createProduct)
router.post('/:id/review', protect, createProductReview)
router.put('/:id', protect, admin, updateProduct)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)

module.exports = router
