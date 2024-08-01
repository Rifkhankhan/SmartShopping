const asyncHandler = require('./../Middleware/asyncHandler')
const Product = require('./../Models/ProductModel')

exports.getProducts = asyncHandler(async (req, res, next) => {
	console.log('get Products')
	try {
		const pageSize = 8
		const page = Number(req.query.pageNumber) || 1

		const keyword = req.query.keyword
			? { name: { $regex: req.query.keyword, $options: 'i' } }
			: {}
		const count = await Product.countDocuments({ ...keyword })
		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1))

		res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
	} catch (error) {
		res.status(404)
		throw new Error('Product are not found')
	}
})

exports.getTopProducts = asyncHandler(async (req, res, next) => {
	try {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3)
		res.status(200).json(products)
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

exports.createProduct = asyncHandler(async (req, res, next) => {
	try {
		const product = await Product.create({
			user: req.user._id,
			name: 'sample product',
			image: './../../frontend/public/images/sample.jpg',
			brand: 'sample brand',
			description: 'sample description',
			price: 100,
			category: 'sample category',
			countInStock: 10
		})

		console.log(product)

		const createdProduct = await product.save()

		res.status(200).json(createdProduct)
	} catch (error) {
		res.status(404)
		throw new Error('Product is not found')
	}
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const { name, price, image, description, brand, category, countInStock } =
		req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name || product.name
		product.price = price || product.price
		product.description = description || product.description
		product.brand = brand || product.brand
		product.category = category || product.category
		product.countInStock = countInStock || product.countInStock
		product.image = image || product.image

		const updatedProduct = await product.save()

		res.status(200).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product is not found')
	}
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await Product.deleteOne({ _id: product._id })

		res.status(200).json({ message: 'deleted Successfully!' })
	} else {
		res.status(404)
		throw new Error('Product is not found')
	}
})

exports.createProductReview = asyncHandler(async (req, res, next) => {
	const { rating, comment } = req.body
	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewd = product.reviews.find(
			review => review.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewd) {
			res.status(400)
			throw new Error('Product is already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id
		}

		product.reviews.push(review)

		product.numbReviews = product.reviews.length

		product.rating =
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			product.reviews.length

		await product.save()

		res.status(201).json({ message: 'Review Added!' })
	} else {
		res.status(404)
		throw new Error('Product is not found')
	}
})
