const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
	console.log('Getting called ...');
	Category.findById(id).exec((err, cat) => {
		if (err) {
			return res.status(404).json({
				error: "Category not found ERR_404"
			})
		}
		req.category = cat;
		next();
	})
}

exports.createCategory = (req, res) => {
	const category = new Category(req.body)
	category.save((err, cat) => {
		if (err || !cat) {
			return res.status(400).json({
				error: "Not able to save category."
			})
		}
		res.json({ category })
	})
}

exports.getCategory = (req, res) => {
	return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
	console.log('Getting called ... ALL');
	Category.find({}, (err, cats) => {
		if (err) {
			return res.status(400).json({
				error: "Category not Found."
			})
		}
		return res.json(cats)
	})
}

exports.updateCategory = (req, res) => {
	const category = req.category
	category.name = req.body.name
	category.save((err, cat) => {
		if (err || !cat) {
			return res.status(400).json({
				error: "Not able to update category."
			})
		}
		res.json(cat)
	})
}

exports.deleteCategory = (req, res) => {
	const category = req.category
	category.remove((err, cat) => {
		if (err || !cat) {
			return res.status(400).json({
				error: `Failed to delete category ${category.name}.`
			})
		}
		res.json({
			message: `Successfully deleted ${category.name}.`
		})
	})
}