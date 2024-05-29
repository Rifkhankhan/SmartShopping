const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

dotenv.config()

// Import routes
const productRoute = require('./Router/productRouter')
const userRouter = require('./Router/userRouter')
const orderRouter = require('./Router/orderRouter')
const uploadRoute = require('./Router/uploadRoute')

const app = express()

// Middleware setup
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS configuration
const corsOptions = {
	origin:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://smartshopping-27iu.onrender.com', // Set your frontend URL in production
	credentials: true, // Allow credentials (cookies)
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Connect to database
connectDB()

// Routes
app.use('/products', productRoute)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/upload', uploadRoute)

// PayPal configuration
app.get('/config/paypal', (req, res) => {
	res.send({ clientId: process.env.PAYPAL_CLIENTID })
})

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const port = process.env.PORT || 5000

// Deployment settings
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))

	// Any route that is not an API will be redirected to index.html
	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
		)
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is Running!')
	})
}

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${port}`
	)
)
