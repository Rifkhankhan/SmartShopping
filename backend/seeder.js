const dotenv = require('dotenv')
const User = require('./Models/UserModel')
const Product = require('./Models/ProductModel')
const Order = require('./Models/OrderModel')
const { users } = require('./data/users')
const { products } = require('./data/products')

const { connectDB } = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log(users)
		const createUsers = await User.insertMany(users)
		const adminUser = createUsers[0]._id

		console.log(createUsers)

		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser }
		})

		await Product.insertMany(sampleProducts)

		console.log('Data Imported')
		process.exit()
	} catch (error) {
		console.log(`Error ${error}`)
		process.exit(1)
	}
}
const destroyData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data Destroyed')
		process.exit()
	} catch (error) {
		console.log(`Error ${error}`)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
