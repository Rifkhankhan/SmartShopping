var mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
const orderSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product'
				}
			}
		],
		shippingAddress: [
			{
				address: { type: String, required: true },
				city: { type: Number, required: true },
				postalcode: { type: String, required: true },
				country: { type: Number, required: true }
			}
		],
		paymentMethodes: {
			type: String,
			required: true
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email: { type: String }
		},
		itemsPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false
		},
		paidAt: {
			type: Date
		},
		isDeliverd: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
