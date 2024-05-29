const express = require('express')
const {
	getMyOrders,
	getOrders,
	addOrderItems,
	getMyOrderById,
	updateOrderToDelivered,
	updateOrderToPaid
} = require('../Controllers/orderController')

const { protect, admin } = require('../Middleware/authMiddlewate')

const router = express.Router()

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getMyOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router
