const bcrypt = require('bcryptjs')

exports.users = [
	{
		name: 'Rifkhan',
		email: 'rifkhanmuhammed17@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Masiya',
		email: 'fathimamasiya5@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},

	{
		name: 'Daniya',
		email: 'daniya@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	}
]
