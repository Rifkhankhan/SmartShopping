// import express from 'express'
const express = require('express')
const dotenv = require('dotenv')
const { products } = require('./data/products')
const { connectDB } = require('./config/db')
const path = require('path')
const cors = require('cors')

const bodyParser = require('body-parser')

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

dotenv.config()

// get routes

const productRoute = require('./Router/productRouter')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

connectDB()

app.use('/products', productRoute)

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
