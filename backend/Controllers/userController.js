const asyncHandler = require('../Middleware/asyncHandler')
const UserModel = require('../Models/UserModel')
const generateToken = require('./../Utils/generateToken')

exports.logoutUser = asyncHandler(async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	})

	res.status(200).json({ message: 'Logged out Succesfully' })
})

exports.authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	const user = await UserModel.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id)

		res.status(201).json({
			userId: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(401)
		throw new Error('Invalid Email Or password')
	}
})

exports.registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body

	const userExist = await UserModel.findOne({ email })

	if (userExist) {
		res.status(400)
		throw new Error('User already exist')
	}

	const user = await UserModel.create({
		name,
		email,
		password
	})

	if (user) {
		generateToken(res, user._id)
		res.status(201).json({ message: 'Successfully Register' })
	} else {
		res.status(401)
		throw new Error('Invalid Email Or password')
	}
})

exports.getUsers = asyncHandler(async (req, res, next) => {
	try {
		const users = await UserModel.find({})

		res.status(200).json(users)
	} catch (error) {
		res.status(404)
		throw new Error('users are not found')
	}
})

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.updateUser = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.getUserProfile = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)
		res.status(200).json({
			name: user.name,
			email: user.email
		})
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)

		user.name = req.body.name
		user.email = req.body.email
		user.password = req.body.password

		const updateProfile = await user.save()

		res.status(200).json(updateProfile)
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})
