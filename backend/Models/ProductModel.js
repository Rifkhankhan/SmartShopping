var mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
const reviewSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true
		},
		comment: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

const productSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	reviews: [reviewSchema],
	numReviews: {
		type: Number,
		required: true,
		default: 0
	},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	category: {
		type: String,
		required: true
	},
	countInStock: {
		type: Number,
		required: true,
		default: 0
	}
})

module.exports =
	mongoose.models.Product || mongoose.model('Product', productSchema)
