const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, prod) => {
			if (err || !prod) {
				return res.status(400).json({
					error: "Product Not found."
				})
			}
			req.product = prod
			next()
		})
}

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with Image."
			})
		}

		const { name, description, price, category, stock } = fields

		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!stock
		) {
			return res.status(400).json({
				error: "Please include all fields"
			})
		}
		//
		let product = new Product(fields)

		// Handle files here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "File size too big!"
				})
			}
			product.photo.data = fs.readFileSync(file.photo.path)
			product.photo.contentType = file.photo.type
		}
		// Save to DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Unable to Save product."
				})
			}
			return res.json(product)
		})
	})
}

exports.getProduct = (req, res) => {
	req.product.photo = undefined
	return res.json(req.product);
}

// Middleware for image fetch
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType)
		return res.send(req.product.photo.data)
	}
	next()
}

exports.deleteProduct = (req, res) => {
	let product = req.product
	product.remove((err, product) => {
		if (err) {
			return res.status(400).json({
				error: `Failed to delete Product ${product.name}`
			})
		}
		res.json({
			message: `Deleted Product "${product.name}" Successfully.`
		})
	})
}

exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem with Image."
			})
		}
		// updation
		let product = req.product;
		product = _.extend(product, fields)

		// Handle files here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "File size too big!"
				})
			}
			product.photo.data = fs.readFileSync(file.photo.path)
			product.photo.contentType = file.photo.type
		}
		// Save to DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Product Update Failed."
				})
			}
			return res.json(product)
		})
	})
}

exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err || !products) {
				return res.status(404).json({
					error: "No products found at this moment. Try later."
				})
			}
			res.json(products)
		})
};

exports.updateStock = (req, res, next) => {
	let myOps = req.body.order.products.map(prod => {
		return {
			updateOne: {
				filter: { _id: prod._id },
				update: { $inc: { stock: -prod.count, sold: +prod.count } }
			}
		}
	})

	Product.bulkWrite(myOps, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Bulk Ops Failded."
			})
		}
		next()
	})
}

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "No categories found!"
			})
		}
		res.json(categories)
	})
}