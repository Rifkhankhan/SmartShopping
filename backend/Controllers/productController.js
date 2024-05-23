const asyncHandler = require('./../Middleware/asyncHandler')
const Product = require('./../Models/ProductModel')

exports.getProducts = asyncHandler(async (req, res, next) => {
	try {
		const products = await Product.find({})

		res.status(200).json({ success: true, products: products })
	} catch (error) {
		res.status(404)
		throw new Error('Product are not found')
	}
})

exports.getProduct = asyncHandler(async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id)

		res.status(200).json(product)
	} catch (error) {
		res.status(404)
		throw new Error('Product are not found')
	}
})
