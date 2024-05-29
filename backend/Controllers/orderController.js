const asyncHandler = require('../Middleware/asyncHandler')

const Order = require('../Models/OrderModel')

exports.addOrderItems = asyncHandler(async (req, res, next) => {
	const { cardItems, shippingAddress, paymentMethod, itemsPrice } = req.body

	if (cardItems && cardItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
	} else {
		const order = new Order({
			orderItems: cardItems.map(x => ({
				...x,
				product: x._id,
				_id: undefined
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod: paymentMethod.paymentMethode,
			itemsPrice: +itemsPrice
		})

		const createOrder = await order.save()

		res.status(201).json(createOrder)
	}
})

exports.getMyOrders = asyncHandler(async (req, res, next) => {
	const myorders = await Order.find({ user: req.user._id })

	res.status(200).json(myorders)
})

exports.getMyOrderById = asyncHandler(async (req, res, next) => {
	const order = await Order.findById({ _id: req.params.id }).populate(
		'user',
		'name email'
	)

	if (order) {
		res.status(200).json(order)
	} else {
		res.status(404)
		throw new Error('order not found')
	}
})

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.email_address
		}

		const updateOrder = await order.save()

		res.status(200).json(updateOrder)
	}
})

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDeliverd = true
		order.deliveredAt = Date.now()

		const updateOrder = await order.save()

		res.status(200).json(updateOrder)
	} else {
		res.status(404)
		throw new Error('order not found')
	}
})

exports.getOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.status(200).json(orders)
})
