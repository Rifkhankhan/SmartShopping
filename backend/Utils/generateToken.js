const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
	try {
		const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
			expiresIn: '30d'
		})

		// Set JWT as HTTP-only cookie
		res.cookie('jwt', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})
	} catch (error) {
		console.error('Error generating token', error)
		res.status(500).send('Internal Server Error')
	}
}

module.exports = generateToken
