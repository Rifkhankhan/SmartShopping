// import express from 'express'
const express = require('express')
const dotenv = require('dotenv')
const { products } = require('./data/products')
const { connectDB } = require('./config/db')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

dotenv.config()

// get routes

const productRoute = require('./Router/productRouter')
const userRouter = require('./Router/userRouter')

const app = express()

//  middleware => then only we can get data from frontend
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// cookie-parser middleware
app.use(cookieParser())

app.use(bodyParser.json())
app.use(cors())

connectDB()

app.use('/products', productRoute)
app.use('/users', userRouter)

// deoploy things
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))

	// any routes that is not api will be  redirected to index.html

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
// deploy things end

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () =>
	console.log(`Server Is ${process.env.NODE_ENV} mode on port ${port}`)
)
