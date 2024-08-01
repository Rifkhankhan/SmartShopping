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

const shopSchema = mongoose.Schema({
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
	address: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	reviews: [reviewSchema],
	numReviews: {
		type: Number,
		required: true,
		default: 0
	},
	countProducts: {
		type: Number,
		required: true,
		default: 0
	},
	category: {
		type: String,
		required: true
	}
})

module.exports = mongoose.models.Shop || mongoose.model('Shop', shopSchema)
