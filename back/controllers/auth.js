const User = require('../models/user')
const { check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// export middleware for same route
exports.signin = (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()
		})
	}

	const { email, password } = req.body
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User doesnot exist !!"
			})
		}
		if (!user.authenticate(password)) { // If auth fails
			return res.status(401).json({
				error: "Email and Password do not match."
			})
		}
		// Signin user
		// Create token and put them in cookies
		const token = jwt.sign({ _id: user._id }, process.env.SECRET)
		res.cookie('token', token, { expire: new Date() + 9999 });

		// Send Response to Front-end
		const { _id, name, email, role } = user
		return res.json({
			token,
			user: { _id, name, email, role }
		})
	}) // DB query end
}

exports.signup = (req, res) => {
	const errors = validationResult(req)

	// Returned value is an object that has array, make it arr, then get first item
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()
		})
	}

	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: "Not able to save user. Try again."
			})
		}
		res.json({
			name: user.name,
			email: user.email,
			id: user._id
		})
	});
}

exports.signout = (req, res) => {
	res.clearCookie('token');

	return res.json({
		message: "User has signed out successfully!"
	})
}

// Protected Routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth"
});

// Cutom middlewares
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id
	if (!checker) {
		return res.status(403).json({
			error: "ACCESS DENIED ERR_403"
		})
	}
	next()
}
exports.isAdmin = (req, res, next) => {
	if (req.profile.role == 0) {
		return res.status(403).json({
			error: "ACCESS DENIED ERR_403 | Not Admin"
		})
	}
	next()
}