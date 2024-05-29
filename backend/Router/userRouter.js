const express = require('express')
const {
	getUsers,
	registerUser,
	getUser,
	logoutUser,
	authUser,
	updateUserProfile,
	getUserProfile,
	deleteUser,
	updateUser
} = require('../Controllers/userController')

const { protect, admin } = require('./../Middleware/authMiddlewate')

const router = express.Router()

router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/logout', protect, logoutUser)
router.post('/login', authUser)

router
	.route('/admin/:id')
	.get(protect, admin, getUser)
	.put(protect, admin, updateUser)
	.delete(protect, admin, deleteUser)

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

module.exports = router
