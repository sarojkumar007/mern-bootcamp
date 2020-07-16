import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
	// eslint-disable-next-line
	const [name, setName] = useState('')
	// eslint-disable-next-line
	const [error, setError] = useState(false)
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false)

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const goBack = () => (
		<div class="dashboard__admin__option--cta">
			<Link to="/admin/dashboard">&nbsp;Back</Link>
		</div>
	)

	const handleChange = (e) => {
		setError('');
		setName(e.target.value)
	}
	const onSubmit = (e) => {
		e.preventDefault();
		setError('');
		setSuccess(false)

		// Backend req
		createCategory(user._id, token, { name }) // Name is like this, because we are using JSON.stringfy in body to POST data in fetch
			.then(data => {
				if (data.error) {
					setError(true)
				}
				else {
					setError('')
					setSuccess(true)
					setName('')
					console.log(data)
				}
			})
	}

	const successMessage = () => {
		if (success) {
			return <div className="alert alert-success mt-2">Category created successfully</div>
		}
	}
	const errorMessage = () => {
		if (error) {
			return <div className="alert alert-danger mt-2">Category creation failed</div>
		}
	}

	const addCategoryForm = () => {
		return (
			<form>
				<div class="input-group">
					<label htmlFor="cat" className="lead">New Category</label>
					<input 
						type="text" 
						name="category"
						id="cat"
						autoFocus required 
						placeholder="e.g. Summer" 
						onChange={handleChange} 
						value={name} 
						autoComplete="off" spellCheck="false"
					/>
				</div>

				<div class="input-group">
					<button
						type="submit" 
						className="button" 
						onClick={onSubmit} >
						Add Category
					</button>
				</div>

			</form>
		)
	}

	return (
		<Base title="Welcome Admin!" description="Add a new category for new products.">
			<section className="section section__dashboard dashboard__admin__option">
				<div className="box">
					{goBack()}
					<section class="section section__signup dashboard__admin__option--box">
						{successMessage()}
						{errorMessage()}
						<h3 class="heading">Create a Category</h3>
						{addCategoryForm()}
					</section>
				</div>
			</section>
		</Base>
	)
}

export default AddCategory;